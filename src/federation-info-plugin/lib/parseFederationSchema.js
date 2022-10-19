import {
  TYPE_KIND,
  INTROSPECTION_TYPES,
  GRAPH_QL_QUERY_NAMES,
  GRAPH_QL_OBJECT_NAMES
} from './constants'

//////////////////////////
// Private ///////////////
//////////////////////////
const sortObjectsByName = objects => {
  return objects.sort((a, b) => {
    if (a.name > b.name) {
      return 1
    }

    return -1
  })
}

const createTypeString = type => {
  //if has a name return it
  if (type.name) {
    return type.name
  }

  switch (type.kind) {
    case TYPE_KIND.LIST:
      return `[${createTypeString(type.ofType)}]`
    case TYPE_KIND.NON_NULL:
      return `${createTypeString(type.ofType)}!`
    default:
      if (type.ofType) {
        return `${type.kind}<${createTypeString(type.ofType)}>`
      } else {
        return type.kind
      }
  }
}

const parseEntityField = field => {
  const { name, type, isExternal } = field
  const typeString = createTypeString(type)

  return {
    name,
    type: typeString,
    isExternal: isExternal || false
  }
}

const parseEntity = entity => {
  const { name, fields, isExtension, key } = entity
  const attributes = fields.map(field => parseEntityField(field))

  return {
    name,
    attributes,
    key,
    isExtension: isExtension || false
  }
}

const getEntitiesFromObjects = (graphQlObjects, excludeTypes) => {
  const rawEntities = graphQlObjects.filter(
    graphQlObject =>
      !excludeTypes.includes(graphQlObject.name) &&
      !INTROSPECTION_TYPES.includes(graphQlObject.name) &&
      !GRAPH_QL_OBJECT_NAMES.includes(graphQlObject.name)
  )

  return sortObjectsByName(rawEntities.map(rawEntity => parseEntity(rawEntity)))
}

const parseGraphQlFunction = graphQlFunction => {
  const { name } = graphQlFunction
  const returnType = createTypeString(graphQlFunction.type)

  return {
    name,
    returnType
  }
}

const getObjectsForFunctionType = (functionTypeName, graphQlObjects) => {
  return graphQlObjects
    .filter(graphQlObject => graphQlObject.name === functionTypeName)
    .map(querieObject => querieObject.fields)
    .flat()
}

const getQueriesFromObjects = (queryTypeName, graphQlObjects) => {
  //if there is no queryType return empty
  if (!queryTypeName) {
    return []
  }
  const queries = getObjectsForFunctionType(
    queryTypeName,
    graphQlObjects
  ).filter(query => !GRAPH_QL_QUERY_NAMES.includes(query.name))

  return sortObjectsByName(queries.map(query => parseGraphQlFunction(query)))
}

const getMutationsFromObjects = (mutationTypeName, graphQlObjects) => {
  //if there is no mutationTypeName return empty
  if (!mutationTypeName) {
    return []
  }
  const mutations = getObjectsForFunctionType(mutationTypeName, graphQlObjects)

  return sortObjectsByName(
    mutations.map(mutation => parseGraphQlFunction(mutation))
  )
}

const getSubscriptionFromObjects = (subscriptionTypeName, graphQlObjects) => {
  //if there is no subscriptionTypeName return empty
  if (!subscriptionTypeName) {
    return []
  }
  const mutations = getObjectsForFunctionType(
    subscriptionTypeName,
    graphQlObjects
  )
  return sortObjectsByName(
    mutations.map(mutation => parseGraphQlFunction(mutation))
  )
}

const getEnumsFromSchema = schema => {
  return sortObjectsByName(
    schema.types.filter(
      type =>
        type.kind === TYPE_KIND.ENUM && !INTROSPECTION_TYPES.includes(type.name)
    )
  )
}

const pasrseNodeSchemaInfo = schema => {
  const queryTypeName = schema.queryType ? schema.queryType.name : undefined
  const mutationTypeName = schema.mutationType
    ? schema.mutationType.name
    : undefined
  const subscriptionTypeName = schema.subscriptionType
    ? schema.subscriptionType.name
    : undefined

  const graphQlObjects = schema.types.filter(
    type => type.kind === TYPE_KIND.OBJECT
  )

  const queries = getQueriesFromObjects(queryTypeName, graphQlObjects)
  const mutations = getMutationsFromObjects(mutationTypeName, graphQlObjects)
  const subscriptions = getSubscriptionFromObjects(
    subscriptionTypeName,
    graphQlObjects
  )

  const enums = getEnumsFromSchema(schema)

  const entities = getEntitiesFromObjects(graphQlObjects, [
    queryTypeName,
    mutationTypeName,
    subscriptionTypeName
  ])

  return {
    queries,
    mutations,
    subscriptions,
    enums,
    entities
  }
}

//////////////////////////
// Public ////////////////
//////////////////////////
const parseFederationSchema = federationSchema => {
  //TODO: Error feedback to user about missing data or incorrect data shape.
  if (!federationSchema.nodes) {
    return undefined
  }

  const nodes = Object.keys(federationSchema.nodes)
    .map(nodeName => {
      //TODO: Should there be an error if a node returned without '__schema'?
      if (!federationSchema.nodes[nodeName]['__schema']) {
        return undefined
      }

      return {
        name: nodeName,
        schema: pasrseNodeSchemaInfo(
          federationSchema.nodes[nodeName]['__schema']
        )
      }
    })
    .filter(node => node)

  const sortedNodes = sortObjectsByName(nodes)

  return sortedNodes
}

export default parseFederationSchema

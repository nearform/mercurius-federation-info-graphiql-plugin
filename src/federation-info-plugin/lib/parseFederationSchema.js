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
  if (type.name) {
    return type.name
  }

  if (type.ofType) {
    return `${type.kind}<${createTypeString(type.ofType)}>`
  }

  return type.kind
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

const getEntitiesFromObjects = (
  queryTypeName,
  mutationTypeName,
  graphQlObjects
) => {
  const rawEntities = graphQlObjects.filter(
    graphQlObject =>
      graphQlObject.name !== queryTypeName &&
      graphQlObject.name !== mutationTypeName &&
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
  const queries = getObjectsForFunctionType(
    queryTypeName,
    graphQlObjects
  ).filter(query => !GRAPH_QL_QUERY_NAMES.includes(query.name))

  return sortObjectsByName(queries.map(query => parseGraphQlFunction(query)))
}

const getMutationsFromObjects = (mutationTypeName, graphQlObjects) => {
  const mutations = getObjectsForFunctionType(mutationTypeName, graphQlObjects)

  return sortObjectsByName(
    mutations.map(mutation => parseGraphQlFunction(mutation))
  )
}

const pasrseNodeSchemaInfo = schema => {
  //TODO: Is there a generic GraphQL default for the query and mutation OBJECT
  //TODO: that should be used in case the queryType and mutationType
  //TODO: is not specified in the schema?
  const queryTypeName = schema.queryType ? schema.queryType.name : undefined
  const mutationTypeName = schema.mutationType
    ? schema.mutationType.name
    : undefined

  //TODO: Implementing the parsing of subscriptions and enumerations

  const graphQlObjects = schema.types.filter(
    type => type.kind === TYPE_KIND.OBJECT
  )

  const queries = getQueriesFromObjects(queryTypeName, graphQlObjects)
  const mutations = getMutationsFromObjects(mutationTypeName, graphQlObjects)
  const entities = getEntitiesFromObjects(
    queryTypeName,
    mutationTypeName,
    graphQlObjects
  )

  return {
    queries,
    mutations,
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

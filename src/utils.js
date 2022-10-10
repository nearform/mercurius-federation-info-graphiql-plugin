const OBJECT_TYPE = 'OBJECT'
// From GraphQL JS Types
const INTROSPECTION_TYPES = [
  '__Schema',
  '__Directive',
  '__DirectiveLocation',
  '__Type',
  '__Field',
  '__InputValue',
  '__EnumValue',
  '__TypeKind'
]

const sortObjectsByName = objects => {
  return objects.sort((a, b) => {
    if (a.name > b.name) {
      return 1
    }

    return -1
  })
}

//TODO: Write test for complex nested types
const createTypeString = type => {
  if (type.name) {
    return type.name
  }

  if (type.ofType) {
    return `${type.kind}<${createTypeString(type.ofType)}>`
  }

  return type.kind
}

const parseQuery = query => {
  const { name } = query
  const returnType = createTypeString(query.type)

  return {
    name,
    returnType
  }
}

const parseEntityField = field => {
  const { name, type: rawType } = field
  const type = createTypeString(rawType)

  return {
    name,
    type
  }
}

const parseEntity = entity => {
  const { name, fields, isExtension } = entity
  const attributes = fields.map(field => parseEntityField(field))

  return {
    name,
    attributes,
    isExtension
  }
}

const pasrseNodeSchemaInfo = schema => {
  const queryTypeName = schema.queryType ? schema.queryType.name : undefined
  // const mutationTypeName = Boolean(schema.queryType) ? schema.queryType.name : undefined
  // const subscriptionTypeName = Boolean(schema.queryType) ? schema.queryType.name : undefined

  const graphQlObjects = schema.types.filter(type => type.kind === OBJECT_TYPE)
  const rawQueries = graphQlObjects
    .filter(graphQlObject => graphQlObject.name === queryTypeName)
    .map(querieObject => querieObject.fields)
    .flat()

  const queries = sortObjectsByName(rawQueries.map(query => parseQuery(query)))

  const rawEntities = graphQlObjects.filter(
    graphQlObject =>
      graphQlObject.name !== queryTypeName &&
      !INTROSPECTION_TYPES.includes(graphQlObject.name)
  )
  const entities = rawEntities.map(rawEntity => parseEntity(rawEntity))

  return {
    queries,
    rawEntities,
    entities
  }
}

export const fetcher = async () => {
  const data = await fetch('http://localhost:3001/federation-schema', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  })

  const parsedData = await data.json().catch(() => data.text())
  if (!parsedData.nodes) {
    return undefined
  }

  const nodes = Object.keys(parsedData.nodes).map(nodeName => ({
    name: nodeName,
    parsedSchema: pasrseNodeSchemaInfo(parsedData.nodes[nodeName]['__schema'])
  }))

  const sortedNodes = sortObjectsByName(nodes)

  return sortedNodes
}

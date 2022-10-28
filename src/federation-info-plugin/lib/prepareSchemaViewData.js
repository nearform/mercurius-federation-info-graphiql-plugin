import { TYPE_KIND, IGNORED_FIELDS, IGNORED_TYPES } from './constants'

/**
 * Extracts types or fields (depending if nodeFractions is list of types or list of nodes) from the list of nodes
 *
 * @param {string} name
 * @param {*} nodesFractions
 * @returns
 */
const fromNodes = (name, nodesFractions) => {
  return nodesFractions
    .map(nodeFraction => nodeFraction.itemsMap[name])
    .filter(i => !!i)
}

const indexNodeFields = (nodeFields, nodeName) => {
  return nodeFields.reduce((result, field) => {
    if (!IGNORED_FIELDS.includes(field.name)) {
      field.nodeName = nodeName
      result[field.name] = field
    }
    return result
  }, {})
}

/**
 * Tranforms the object returned fromt the server into an array of objects that is easy to extract owner/reference information, without excessive iteration.
 * Ideally should replace `parseFederationSchema`
 *
 * @param {{[string]: { __schema: import('graphql').IntrospectionQuery } }} federationSchema example: { "node1": {__schema: IntrospectionQuery }}
 * @returns Object that is used to retrieve referencedBy and Owner
 * @example
 * ```
 * [
 * {
 *      nodeName:'node1',
 *      itemsMap: {
 *          User: {
 *              nodeName:'node1',
 *              itemsMap: {
 *                  id: {
 *                      nodeName:'node1'
 *                      },
 *                  ...rest of the field props
 *                  },
 *              ...rest of the type props
 *              },
 *          ...rest of the node props
 *      }
 * }
 * ]
 *```
 */
const prepareNodesSchema = federationSchema => {
  const nodesEntries = Object.entries(federationSchema.nodes)
  return nodesEntries.map(([nodeName, { __schema }]) => {
    const { types } = __schema
    const itemsMap = types.reduce((result, current) => {
      if (!IGNORED_TYPES.includes(current.name)) {
        let itemsMap = {}
        if (current.kind === TYPE_KIND.OBJECT) {
          itemsMap = indexNodeFields(current.fields, nodeName)
        } else if (current.kind === TYPE_KIND.INPUT_OBJECT) {
          itemsMap = indexNodeFields(current.inputFields, nodeName)
        }

        result[current.name] = { ...current, itemsMap, nodeName }
      }
      return result
    }, {})

    return { nodeName, itemsMap }
  })
}

/**
 * Prepares the main schema (of type GraphQLSchema) so it can easily be rendered
 *
 * @param {{[string]: { __schema: import('graphql').IntrospectionQuery } }} federationSchema
 * @param {import('graphql').GraphQLSchema} schema
 *
 * @returns see example
 * @example
 * ```
 * [
 *  {
 *      name: "User"
 *      ownerNodes: ["node1"],
 *      referecedBy: [{ nodeName: "node2", key: "id"}],
 *      fields: [
 *          {
 *              name: "id",
 *              ownerNodes: ["node1"],
 *              referencedBy: ["node2"],
 *              ...other fields properties
 *          }
 *      ],
 *      ...other type properties
 *  }
 * ]
 * ```
 */
export const prepareSchemaView = (federationSchema, schema) => {
  // return empty object if either one of the arguments is falsy
  if (!schema || !federationSchema) return {}

  const nodes = prepareNodesSchema(federationSchema)

  //transverse the merged GraphQLSchema and add referencedBy and owner properties to it
  return Object.entries(schema.getTypeMap())
    .filter(([name]) => !IGNORED_TYPES.includes(name))
    .map(([typeName, type]) => {
      const typesFromNodes = fromNodes(typeName, nodes)
      const ownerNodes = typesFromNodes
        .filter(({ isExtension }) => !isExtension)
        .map(({ nodeName }) => nodeName)
      const referecedBy = typesFromNodes
        .filter(({ key }) => !!key)
        .map(({ nodeName, key }) => ({
          nodeName,
          key
        }))

      let fields = []
      if (type.getFields) {
        fields = Object.values(type.getFields()).map(field => {
          const fieldsFromNodes = fromNodes(field.name, typesFromNodes)
          const ownerNodes = fieldsFromNodes
            .filter(({ isExternal }) => !isExternal)
            .map(({ nodeName }) => nodeName)
          const referecedBy = fieldsFromNodes
            .filter(({ isExternal }) => isExternal)
            .map(({ nodeName }) => nodeName)

          return { ...field, ownerNodes, referecedBy, fieldsFromNodes }
        })
      }

      return { ...type, ownerNodes, referecedBy, fields }
    })
}

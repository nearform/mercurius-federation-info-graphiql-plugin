import { IGNORED_TYPES } from './constants'

/**
 * Extracts types or fields (depending if nodeFractions is list of types or list of nodes) from the list of nodes
 *
 * @param {string} name
 * @param {*} nodesFractions
 * @returns
 */
export const fromNodes = (name, nodesFractions) =>
  nodesFractions
    .map(nodeFraction => nodeFraction.itemsMap[name])
    .filter(i => !!i)

/**
 * Prepares the main schema (of type GraphQLSchema) so it can easily be rendered
 *
 * @param {ReturnType<typeof prepareNodesViewData>} federationSchema
 * @param {import('graphql').GraphQLSchema} schema
 *
 * @returns see example
 * @example
 * ```
 * [
 *  {
 *      name: "User"
 *      ownerNodes: ["node1"],
 *      referencedBy: [{ nodeName: "node2", key: "id"}],
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
export const prepareSchemaViewData = (nodeViewData, schema) => {
  // return empty object if either one of the arguments is falsy
  if (!schema || !nodeViewData) return {}

  // transverse the merged GraphQLSchema and add referencedBy and owner properties to it
  return Object.entries(schema.getTypeMap())
    .filter(([name]) => !IGNORED_TYPES.includes(name))
    .map(([typeName, type]) => {
      //TODO: const ownedBy = ownedBy(nodeFragment)
      //TODO: const ownedBy = referencedBy(nodeFragment)
      const typesFromNodes = fromNodes(typeName, nodeViewData)
      const ownerNodes = typesFromNodes
        .filter(({ isExtension }) => !isExtension)
        .map(({ nodeName }) => nodeName)
      const referencedBy = typesFromNodes
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
          const referencedBy = fieldsFromNodes
            .filter(({ isExternal }) => isExternal)
            .map(({ nodeName }) => nodeName)

          return { ...field, ownerNodes, referencedBy, fieldsFromNodes }
        })
      }

      return { ...type, ownerNodes, referencedBy, fields }
    })
}

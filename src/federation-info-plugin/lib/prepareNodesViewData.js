import { IGNORED_FIELDS, IGNORED_TYPES } from './constants'
import introspectionTypeToString from './introspectionTypeToString'
import { TypeKind } from 'graphql'

/**
 * Reduces the list of fields into a { [name]: field } map, removes internal fields, attaches the nodeName and stringified type name to it
 *
 * @param {import('graphql').IntrospectionField[]} nodeFields
 * @param {string} nodeName
 * @returns {{[fieldName: string]: import('graphql').IntrospectionField & { nodeName: string, typeString: string }}}
 */
export const indexNodeFields = (nodeFields, nodeName) => {
  return nodeFields.reduce((result, field) => {
    if (!IGNORED_FIELDS.includes(field.name)) {
      field.nodeName = nodeName
      field.typeString = introspectionTypeToString(field.type)
      result[field.name] = field
    }
    return result
  }, {})
}

/**
 * Tranforms the object returned fromt the server into an array of objects that is easy to extract owner/reference information, without excessive iteration.
 * Ideally should replace `parseFederationSchema`
 *
 * @param {{[node: string]: { __schema: import('graphql').IntrospectionQuery } }} federationSchema example: { "node1": {__schema: IntrospectionQuery }}
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
 *                  typeString: '[Int]!',
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
export const prepareNodesViewData = federationSchema => {
  const nodesEntries = Object.entries(federationSchema.nodes)
  return nodesEntries.map(([nodeName, { __schema }]) => {
    const { types } = __schema
    const itemsMap = types.reduce((result, type) => {
      if (!IGNORED_TYPES.includes(type.name)) {
        let itemsMap
        if (type.kind === TypeKind.OBJECT) {
          itemsMap = indexNodeFields(type.fields, nodeName)
        } else if (type.kind === TypeKind.INPUT_OBJECT) {
          itemsMap = indexNodeFields(type.inputFields, nodeName)
        } else {
          itemsMap = {}
        }

        result[type.name] = { ...type, itemsMap, nodeName }
      }
      return result
    }, {})

    return { nodeName, itemsMap }
  })
}

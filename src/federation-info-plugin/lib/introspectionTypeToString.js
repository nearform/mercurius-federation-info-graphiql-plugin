import { TypeKind } from 'graphql'

/**
 *
 * @param {import('graphql').IntrospectionOutputTypeRef} type
 * @returns {string} Type strin (e.g. [User!])
 */
const introspectionTypeToString = type => {
  // if has a name return it
  if (type.name) {
    return type.name
  }

  switch (type.kind) {
    case TypeKind.LIST:
      return `[${introspectionTypeToString(type.ofType)}]`
    case TypeKind.NON_NULL:
      return `${introspectionTypeToString(type.ofType)}!`
    default:
      if (type.ofType) {
        return `${type.kind}<${introspectionTypeToString(type.ofType)}>`
      } else {
        return type.kind
      }
  }
}

export default introspectionTypeToString

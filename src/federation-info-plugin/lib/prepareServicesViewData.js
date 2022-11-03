import { IGNORED_FIELDS, IGNORED_TYPES } from './constants'
import introspectionTypeToString from './introspectionTypeToString'
import { TypeKind } from 'graphql'

/**
 * Reduces the list of fields into a { [name]: field } map, removes internal fields, attaches the serviceName and stringified type name to it
 *
 * @param {import('graphql').IntrospectionField[]} serviceFields
 * @param {string} serviceName
 * @returns {{[fieldName: string]: import('graphql').IntrospectionField & { serviceName: string, typeString: string }}}
 */
export const indexServiceFields = (serviceFields, serviceName) => {
  return serviceFields.reduce((result, field) => {
    if (!IGNORED_FIELDS.includes(field.name)) {
      field.serviceName = serviceName
      field.typeString = introspectionTypeToString(field.type)
      result[field.name] = field
    }
    return result
  }, {})
}

/**
 * Transforms the object returned from the server into an array of objects that is easy to extract owner/reference information, without excessive iteration.
 * Ideally should replace `parseFederationSchema`
 *
 * @param {{[service: string]: { __schema: import('graphql').IntrospectionQuery } }} federationSchema example: { "service1": {__schema: IntrospectionQuery }}
 * @returns Object that is used to retrieve referencedBy and Owner
 * @example
 * ```
 * [
 * {
 *      serviceName:'service1',
 *      itemsMap: {
 *          User: {
 *              serviceName:'service1',
 *              itemsMap: {
 *                  typeString: '[Int]!',
 *                  id: {
 *                      serviceName:'service1'
 *                      },
 *                  ...rest of the field props
 *                  },
 *              ...rest of the type props
 *              },
 *          ...rest of the service props
 *      }
 * }
 * ]
 *```
 */
export const prepareServicesViewData = federationSchema => {
  const servicesEntries = Object.entries(federationSchema.services)
  return servicesEntries.map(([serviceName, { __schema }]) => {
    const { types } = __schema
    const itemsMap = types.reduce((result, type) => {
      if (!IGNORED_TYPES.includes(type.name)) {
        let itemsMap
        if (type.kind === TypeKind.OBJECT) {
          itemsMap = indexServiceFields(type.fields, serviceName)
        } else if (type.kind === TypeKind.INPUT_OBJECT) {
          itemsMap = indexServiceFields(type.inputFields, serviceName)
        } else {
          itemsMap = {}
        }

        result[type.name] = { ...type, itemsMap, serviceName }
      }
      return result
    }, {})

    return { serviceName, itemsMap }
  })
}

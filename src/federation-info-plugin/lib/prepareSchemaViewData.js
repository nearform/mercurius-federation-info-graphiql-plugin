import { IGNORED_TYPES } from './constants'

/**
 * Extracts types or fields (depending if servicesFractions is list of types or list of services) from the list of services
 *
 * @param {string} name
 * @param {*} servicesFractions
 * @returns
 */
export const fromServices = (name, servicesFractions) =>
  servicesFractions
    .map(serviceFraction => serviceFraction.itemsMap[name])
    .filter(i => !!i)

/**
 * Prepares the main schema (of type GraphQLSchema) so it can easily be rendered
 *
 * @param {ReturnType<typeof import('./prepareServicesViewData.js').prepareServicesViewData>} federationViewData
 * @param {import('graphql').GraphQLSchema} schema
 *
 * @returns see example
 * @example
 * ```
 * [
 *  {
 *      name: "User"
 *      ownerServices: ["service1"],
 *      referencedBy: [{ serviceName: "service2", key: "id"}],
 *      fields: [
 *          {
 *              name: "id",
 *              ownerServices: ["service1"],
 *              referencedBy: ["service2"],
 *              ...other fields properties
 *          }
 *      ],
 *      ...other type properties
 *  }
 * ]
 * ```
 */
export const prepareSchemaViewData = (federationViewData, schema) => {
  // return empty object if either one of the arguments is falsy
  if (!schema || !federationViewData) return {}

  // transverse the merged GraphQLSchema and add referencedBy and owner properties to it
  return Object.entries(schema.getTypeMap())
    .filter(([name]) => !IGNORED_TYPES.includes(name))
    .map(([typeName, type]) => {
      //TODO: const ownedBy = ownedBy(serviceFragment)
      //TODO: const ownedBy = referencedBy(serviceFragment)
      const typesFromServices = fromServices(typeName, federationViewData)
      const ownerServices = typesFromServices
        .filter(({ isExtension }) => !isExtension)
        .map(({ serviceName }) => serviceName)
      const referencedBy = typesFromServices
        .filter(({ key }) => !!key)
        .map(({ serviceName, key }) => ({
          serviceName,
          key
        }))

      let fields = []
      if (type.getFields) {
        fields = Object.values(type.getFields()).map(field => {
          const fieldsFromServices = fromServices(field.name, typesFromServices)
          const ownerServices = fieldsFromServices
            .filter(({ isExternal }) => !isExternal)
            .map(({ serviceName }) => serviceName)
          const referencedBy = fieldsFromServices
            .filter(({ isExternal }) => isExternal)
            .map(({ serviceName }) => serviceName)

          return { ...field, ownerServices, referencedBy, fieldsFromServices }
        })
      }

      return { ...type, ownerServices, referencedBy, fields }
    })
}

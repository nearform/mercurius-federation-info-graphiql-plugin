const matchesSearchInput = (search, toCompare) =>
  toCompare?.toLowerCase()?.indexOf(search?.toLowerCase()) > -1

const hasMatches = obj => obj && Object.keys(obj).length > 0
//make it a hook maybe?
const filterServicesInfo = (services, query) => {
  const filteredServices = []
  const treeOpenState = {
    openServices: [],
    openServiceTreeNodes: []
  }

  if (!query || query.length < 2) {
    return { filteredServices: services }
  }

  //check if we even do any filtering at all
  if (query && services && services.length) {
    //loop and search in services
    for (const service of services) {
      let matchingTypes = {}
      //loop and search in types
      for (const [typeName, typeDetails] of Object.entries(service.itemsMap)) {
        const matchingFields = {}
        if (typeDetails.itemsMap) {
          //loop and search in fields
          for (const [fieldName, fieldDetails] of Object.entries(
            typeDetails.itemsMap
          )) {
            if (matchesSearchInput(query, fieldName)) {
              matchingFields[fieldName] = fieldDetails
            }
          }
        }
        //handle found field
        if (hasMatches(matchingFields)) {
          //todo add directly to the thing
          treeOpenState.openServiceTreeNodes.push(
            `${service.serviceName}-${typeName}`
          )
          matchingTypes[typeName] = { ...typeDetails, itemsMap: matchingFields }
          //find types
        } else if (matchesSearchInput(query, typeName)) {
          matchingTypes[typeName] = { ...typeDetails }
        }
      }
      //handle found  types
      if (hasMatches(matchingTypes)) {
        treeOpenState.openServices.push(service.serviceName)

        filteredServices.push({ ...service, itemsMap: matchingTypes })
        //find services
      } else if (matchesSearchInput(query, service.serviceName)) {
        filteredServices.push(service)
      }
    }
  }

  return { filteredServices, treeOpenState }
}

export default filterServicesInfo

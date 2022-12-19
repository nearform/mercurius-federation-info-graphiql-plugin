import filterDeep from 'deepdash/filterDeep'

const filterServicesInfo = (services, query) => {
  const filteredServices = []

  if (query && services && services.length) {
    for (const service of services) {
      const filteredServiceSubtree = filterDeep(
        service,
        serviceInfo => {
          // filter if the query text is found in either the name, service name or type name
          return (
            serviceInfo?.name?.toLowerCase()?.indexOf(query?.toLowerCase()) >
              -1 ||
            serviceInfo?.serviceName
              ?.toLowerCase()
              ?.indexOf(query?.toLowerCase()) > -1
          )
        },
        { childrenPath: 'itemsMap' } // this is where the recursion magic happen
      )

      if (filteredServiceSubtree) {
        filteredServices.push(filteredServiceSubtree)
      }
    }
  }

  return filteredServices
}

export default filterServicesInfo

import { filterDeep } from 'deepdash-es/standalone'

const filterServicesInfo = (services, query) => {
  const filteredServices = []

  if (query && services.length) {
    services.map(service => {
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
    })
  }

  return filteredServices
}

export default filterServicesInfo

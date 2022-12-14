import { filterDeep } from 'deepdash-es/standalone'

const filterServicesInfo = (services, query) => {
  return query
    ? filterDeep(
        services[0],
        serviceInfo =>
          serviceInfo?.serviceName?.localeCompare(query) > -1 ||
          serviceInfo?.name?.localeCompare(query) > -1,
        { childrenPath: 'itemsMap' }
      )
    : null
}

export default filterServicesInfo

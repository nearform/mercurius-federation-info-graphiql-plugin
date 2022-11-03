import { useEffect, useMemo, useState } from 'react'
import { prepareServicesViewData } from './prepareServicesViewData'

export async function fetchFederationSchema(url) {
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  return await data.json().catch(() => data.text())
}

export default function useFederationInfo(federationSchemaUrl) {
  const [servicesViewData, setServicesViewData] = useState([])
  const [fetchFederationInfoError, setFetchFederationInfoError] = useState()
  const [isFederationInfoFetching, setFederationInfoFetching] = useState(true)

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const federationSchema = await fetchFederationSchema(
          federationSchemaUrl
        )

        setServicesViewData(prepareServicesViewData(federationSchema))
        setFederationInfoFetching(false)
      } catch (e) {
        console.log(e)
        setFetchFederationInfoError(e)
      }
    }
    setFederationInfoFetching(true)
    fetchSchema()
  }, [federationSchemaUrl])

  return useMemo(
    () => ({
      servicesViewData,
      fetchFederationInfoError,
      isFederationInfoFetching
    }),
    [servicesViewData, fetchFederationInfoError, isFederationInfoFetching]
  )
}

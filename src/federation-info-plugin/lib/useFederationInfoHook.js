import { useEffect, useMemo, useState } from 'react'
import { prepareNodesViewData } from './prepareNodesViewData'

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
  const [nodesViewData, setNodesViewData] = useState([])
  const [fetchFederationInfoError, setFetchFederationInfoError] = useState()
  const [isFederationInfoFetching, setFederationInfoFetching] = useState(true)

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const federationSchema = await fetchFederationSchema(
          federationSchemaUrl
        )

        setNodesViewData(prepareNodesViewData(federationSchema))
        setFederationInfoFetching(false)
      } catch (e) {
        setFetchFederationInfoError(e)
      }
    }
    setFederationInfoFetching(true)
    fetchSchema()
  }, [federationSchemaUrl])

  return useMemo(
    () => ({
      nodesViewData,
      fetchFederationInfoError,
      isFederationInfoFetching
    }),
    [nodesViewData, fetchFederationInfoError, isFederationInfoFetching]
  )
}

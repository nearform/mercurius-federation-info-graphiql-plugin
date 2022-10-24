import React from 'react'
import { useMemo, useState, useEffect } from 'react'

import { Content, Icon } from './FederationInfo'

import fetchFederationSchema from './lib/fetchFederationSchema'
import parseFederationSchema from './lib/parseFederationSchema'

export function FederationInfoPlugin(props) {
  const { federationSchemaUrl } = props

  const [federationNodes, setFederationNodes] = useState([])

  const [fetchError, setFetchError] = useState()

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const federationSchema = await fetchFederationSchema(
          federationSchemaUrl
        )
        setFederationNodes(parseFederationSchema(federationSchema))
      } catch (e) {
        setFetchError(e)
      }
    }

    fetchSchema()
  }, [federationSchemaUrl])

  return useMemo(
    () => ({
      title: 'GraphiQL Explorer',
      icon: () => <Icon />,
      content: () => (
        <Content federationNodes={federationNodes} error={fetchError} />
      )
    }),
    [federationNodes, fetchError]
  )
}

export function umdPlugin(props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return FederationInfoPlugin(props)
}

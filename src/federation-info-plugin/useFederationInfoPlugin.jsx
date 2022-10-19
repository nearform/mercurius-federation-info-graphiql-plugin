import { useMemo, useState, useEffect } from 'react'

import { Content, Icon } from './FederationInfoPlugin'

import fetchFederationSchema from './lib/fetchFederationSchema'
import parseFederationSchema from './lib/parseFederationSchema'

export function useFederationInfoPlugin(props) {
  const { federationSchemaUrl } = props

  const [federationNodes, setFederationNodes] = useState({})

  useEffect(() => {
    const fetchSchema = async () => {
      const federationSchema = await fetchFederationSchema(federationSchemaUrl)
      setFederationNodes(parseFederationSchema(federationSchema))
    }

    fetchSchema()
  }, [federationSchemaUrl])

  return useMemo(
    () => ({
      title: 'GraphiQL Explorer',
      icon: () => <Icon />,
      content: () => <Content federationNodes={federationNodes} />
    }),
    [federationNodes]
  )
}

export function umdPlugin() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useFederationInfoPlugin()
}

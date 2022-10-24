import React, { useEffect, useState } from 'react'

import FederationNode from './components/FederationNode/FederationNode'
import fetchFederationSchema from './lib/fetchFederationSchema'
import parseFederationSchema from './lib/parseFederationSchema'

const FederationInfoContent = ({ federationSchemaUrl }) => {
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

  return (
    <div>
      <h3>Federation Info</h3>
      {fetchError && (
        <div>Error fetching federation schema: {fetchError.message}</div>
      )}
      {federationNodes.map((federationNode, index) => (
        <FederationNode key={index} federationNode={federationNode} />
      ))}
    </div>
  )
}

const Icon = () => <div>t</div> // <ShareNodes fill="currentColor" data-testid="plugin-icon" />

export { FederationInfoContent, Icon }

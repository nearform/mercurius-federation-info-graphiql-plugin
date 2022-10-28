import React, { useEffect, useState } from 'react'

import fetchFederationSchema from './lib/fetchFederationSchema'
import parseFederationSchema from './lib/parseFederationSchema'
import { prepareSchemaView } from './lib/prepareSchemaViewData'
import { ReactComponent as ShareNodes } from './icons/share-nodes.svg'
import { TabGroup, TabButton } from './components/Tabs/Tabs'
import SchemaView from './views/SchemaView'
import { Spinner, useSchemaContext } from '@graphiql/react'
import NodesView from './views/NodesView'

const TABS = {
  NODES: 0,
  SCHEMA: 1
}
const FederationInfoContent = ({ federationSchemaUrl }) => {
  const [federationNodes, setFederationNodes] = useState([])
  const [schemaViewData, setSchemaViewData] = useState({})

  const {
    fetchError,
    isFetching: isSchemaFetching,
    schema
  } = useSchemaContext({ nonNull: true, caller: FederationInfoContent })

  //TODO move fetchFederationSchema to useFederationInfoSchemaContex
  const [fetchFederationInfoError, setFetchFederationInfoError] = useState()
  const [isFederationInfoFetching, setFederationInfoFetching] = useState(true)

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const federationSchema = await fetchFederationSchema(
          federationSchemaUrl
        )
        setFederationNodes(parseFederationSchema(federationSchema))
        setSchemaViewData(prepareSchemaView(federationSchema, schema))
        setFederationInfoFetching(false)
      } catch (e) {
        setFetchFederationInfoError(e)
      }
    }
    setFederationInfoFetching(true)
    fetchSchema()
  }, [federationSchemaUrl, schema])

  const isFetching = isFederationInfoFetching || isSchemaFetching
  const isError = fetchError || fetchFederationInfoError

  const [activeTab, setActiveTab] = useState(0)
  if (isError) {
    return (
      <div>
        {fetchFederationInfoError && (
          <div>
            Error fetching federation schema: {fetchFederationInfoError.message}
          </div>
        )}
        {fetchError && <div>Error fetching schema: {fetchError.message}</div>}
      </div>
    )
  }

  return (
    <div>
      <h3>Federation Info</h3>
      {isFetching && <Spinner />}
      {!isFetching && (
        <div>
          <TabGroup>
            <TabButton
              isActive={activeTab === TABS.NODES}
              onClick={() => setActiveTab(TABS.NODES)}
            >
              Nodes
            </TabButton>
            <TabButton
              isActive={activeTab === TABS.SCHEMA}
              onClick={() => setActiveTab(TABS.SCHEMA)}
            >
              Schema
            </TabButton>
          </TabGroup>
          {activeTab === TABS.NODES && (
            <NodesView federationNodes={federationNodes} />
          )}
          {activeTab === TABS.SCHEMA && (
            <SchemaView
              federationNodes={federationNodes}
              schema={schema}
              schemaViewData={schemaViewData}
            />
          )}
        </div>
      )}
    </div>
  )
}

const Icon = () => <ShareNodes fill="currentColor" data-testid="plugin-icon" />

export { FederationInfoContent, Icon }

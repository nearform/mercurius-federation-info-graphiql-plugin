import React, { useEffect, useState } from 'react'

import { prepareSchemaViewData } from './lib/prepareSchemaViewData'
import useFederationInfo from './lib/useFederationInfoHook'
import { ReactComponent as ShareNodes } from './icons/share-nodes.svg'
import { TabGroup, TabButton } from './components/Tabs/Tabs'
import SchemaView from './views/SchemaView'
import { Spinner, useSchemaContext } from '@graphiql/react'
import NodesView from './views/NodesView'

const TABS = {
  SCHEMA: 0,
  NODES: 1
}

const FederationInfoContent = ({ federationSchemaUrl }) => {
  const [schemaViewData, setSchemaViewData] = useState([])

  const {
    schema,
    fetchError: fetchSchemaError,
    isFetching: isSchemaFetching
  } = useSchemaContext({ nonNull: true, caller: FederationInfoContent })

  const { nodesViewData, fetchFederationInfoError, isFederationInfoFetching } =
    useFederationInfo(federationSchemaUrl)

  //needs both schema and nodesViewData to prepare the schema view
  useEffect(() => {
    if (schema && nodesViewData) {
      setSchemaViewData(prepareSchemaViewData(nodesViewData, schema))
    }
  }, [schema, nodesViewData])

  const isFetching = isFederationInfoFetching || isSchemaFetching
  const isError = fetchSchemaError || fetchFederationInfoError

  const [activeTab, setActiveTab] = useState(TABS.SCHEMA)
  if (isError) {
    return (
      <div>
        {fetchFederationInfoError && (
          <div>
            Error fetching federation schema: {fetchFederationInfoError.message}
          </div>
        )}
        {fetchSchemaError && (
          <div>Error fetching schema: {fetchSchemaError.message}</div>
        )}
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
              isActive={activeTab === TABS.SCHEMA}
              onClick={() => setActiveTab(TABS.SCHEMA)}
            >
              Schema
            </TabButton>
            <TabButton
              isActive={activeTab === TABS.NODES}
              onClick={() => setActiveTab(TABS.NODES)}
            >
              Nodes
            </TabButton>
          </TabGroup>
          {activeTab === TABS.NODES && (
            <NodesView federationNodes={nodesViewData} />
          )}
          {activeTab === TABS.SCHEMA && (
            <SchemaView schemaViewData={schemaViewData} />
          )}
        </div>
      )}
    </div>
  )
}

const Icon = () => <ShareNodes fill="currentColor" data-testid="plugin-icon" />

export { FederationInfoContent, Icon }

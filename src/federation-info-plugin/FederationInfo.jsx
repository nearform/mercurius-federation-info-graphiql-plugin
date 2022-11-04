import React, { useEffect, useState } from 'react'

import { prepareSchemaViewData } from './lib/prepareSchemaViewData'
import useFederationInfo from './lib/useFederationInfoHook'
import { ReactComponent as ShareNodes } from './icons/share-nodes.svg'
import { TabGroup, TabButton } from './components/Tabs/Tabs'
import SchemaView from './views/SchemaView'
import { Spinner, useSchemaContext } from '@graphiql/react'
import ServicesView from './views/ServicesView'

const TABS = {
  SCHEMA: 0,
  SERVICES: 1
}

const FederationInfoContent = ({ federationSchemaUrl }) => {
  const [schemaViewData, setSchemaViewData] = useState([])
  const [rootTypes, setRootTypes] = useState(null)
  const {
    schema,
    fetchError: fetchSchemaError,
    isFetching: isSchemaFetching
  } = useSchemaContext({ nonNull: true, caller: FederationInfoContent })

  const {
    servicesViewData,
    fetchFederationInfoError,
    isFederationInfoFetching
  } = useFederationInfo(federationSchemaUrl)

  //needs both schema and servicesViewData to prepare the schema view
  useEffect(() => {
    if (schema && servicesViewData) {
      setRootTypes({
        queries: schema.getQueryType().name,
        mutations: schema.getMutationType().name,
        subscriptions: schema.getSubscriptionType().name
      })
      setSchemaViewData(prepareSchemaViewData(servicesViewData, schema))
    }
  }, [schema, servicesViewData])

  const isFetching = isFederationInfoFetching || isSchemaFetching || !rootTypes
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
              isActive={activeTab === TABS.SERVICES}
              onClick={() => setActiveTab(TABS.SERVICES)}
            >
              Services
            </TabButton>
          </TabGroup>
          {activeTab === TABS.SERVICES && (
            <ServicesView federationServices={servicesViewData} />
          )}
          {activeTab === TABS.SCHEMA && (
            <SchemaView schemaViewData={schemaViewData} rootTypes={rootTypes} />
          )}
        </div>
      )}
    </div>
  )
}

const Icon = () => <ShareNodes fill="currentColor" data-testid="plugin-icon" />

export { FederationInfoContent, Icon }

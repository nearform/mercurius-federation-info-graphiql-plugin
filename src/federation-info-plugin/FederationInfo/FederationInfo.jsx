import React, { useEffect, useState } from 'react'
import { Spinner, useSchemaContext, useDragResize } from '@graphiql/react'
import { Box } from '@mui/material'

import { prepareSchemaViewData } from '../lib/prepareSchemaViewData'
import useFederationInfo from '../lib/useFederationInfoHook'
import SchemaView from '../views/SchemaView/SchemaView'
import ServicesView from '../views/ServicesView/ServicesView'

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

  const servicesSchemaResize = useDragResize({
    defaultSizeRelation: 0.32,
    direction: 'horizontal',
    sizeThresholdSecond: 250,
    storageKey: 'serviceSchemaResize'
  })
  //needs both schema and servicesViewData to prepare the schema view
  useEffect(() => {
    if (schema && servicesViewData) {
      setRootTypes({
        queries: schema.getQueryType()?.name,
        mutations: schema.getMutationType()?.name,
        subscriptions: schema.getSubscriptionType()?.name
      })
      setSchemaViewData(prepareSchemaViewData(servicesViewData, schema))
    }
  }, [schema, servicesViewData])

  const isFetching = isFederationInfoFetching || isSchemaFetching || !rootTypes
  const isError = fetchSchemaError || fetchFederationInfoError
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
    <Box>
      <h1 style={{ margin: 0 }}>Federation Info</h1>
      <Box sx={{ display: 'flex', flex: 1, marginTop: 1, gap: 0 }}>
        <div
          ref={servicesSchemaResize.firstRef}
          style={{
            minWidth: '200px'
          }}
        >
          {!isFetching && (
            <ServicesView federationServices={servicesViewData} />
          )}
        </div>
        <div ref={servicesSchemaResize.dragBarRef}>
          <div className="graphiql-horizontal-drag-bar" />
        </div>
        <div ref={servicesSchemaResize.secondRef} style={{ minWidth: '200px' }}>
          {isFetching && <Spinner />}
          {!isFetching && (
            <SchemaView schemaViewData={schemaViewData} rootTypes={rootTypes} />
          )}
        </div>
      </Box>
    </Box>
  )
}

export default FederationInfoContent

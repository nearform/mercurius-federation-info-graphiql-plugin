import React, { useEffect, useState } from 'react'
import { Spinner, useSchemaContext } from '@graphiql/react'
import { Box } from '@mui/material'

import { prepareSchemaViewData } from '../lib/prepareSchemaViewData'
import useFederationInfo from '../lib/useFederationInfoHook'
import { ReactComponent as ShareNodes } from '../icons/share-nodes.svg'
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
      <h1>Federation Info</h1>
      {isFetching && <Spinner />}
      {!isFetching && (
        <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 1 }}>
          <ServicesView federationServices={servicesViewData} />
          <SchemaView schemaViewData={schemaViewData} rootTypes={rootTypes} />
        </Box>
      )}
    </Box>
  )
}

export default FederationInfoContent

import React, { useEffect, useState } from 'react'

import { prepareSchemaViewData } from './lib/prepareSchemaViewData'
import useFederationInfo from './lib/useFederationInfoHook'
import { ReactComponent as ShareNodes } from './icons/share-nodes.svg'
import SchemaView from './views/SchemaView'
import { Spinner, useSchemaContext } from '@graphiql/react'
import ServicesView from './views/ServicesView'
import { styled } from '@mui/material/styles'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { createTheme } from '@mui/system'

const FederationInfoContent = ({ federationSchemaUrl }) => {
  const theme = createTheme()

  const [schemaViewData, setSchemaViewData] = useState([])
  const [rootTypes, setRootTypes] = useState(null)
  const [open, setOpen] = useState(false)
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

  useEffect(() => {
    if (!isFetching) {
      setOpen(true)
    }
  }, [isFetching])

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
    <Root className="graphiql-container">
      <h1>Federation Info</h1>
      {isFetching && <Spinner />}
      {!isFetching && (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          disableScrollLock={false}
        >
          <Box
            sx={{
              backgroundColor: 'white',
              width: '90%',
              height: '90%',
              position: 'relative',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: theme.spacing(3)
            }}
          >
            <h1>Federation Info</h1>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                overflow: 'auto',
                height: 'inherit',
                marginTop: theme.spacing(2)
              }}
            >
              <ServicesView federationServices={servicesViewData} />
              <SchemaView
                schemaViewData={schemaViewData}
                rootTypes={rootTypes}
              />
            </Box>
          </Box>
        </Modal>
      )}
    </Root>
  )
}

const Icon = () => <ShareNodes fill="currentColor" data-testid="plugin-icon" />

const PREFIX = 'FederationInfo'
const classes = {
  viewContainer: `${PREFIX}-viewContainer`
}

const Root = styled('div')(() => ({
  [`& .${classes.viewContainer}`]: {
    display: 'flex',
    flexDirection: 'row'
  }
}))

export { FederationInfoContent, Icon }

import React, { useMemo, useState, useDeferredValue } from 'react'
import { Box } from '@mui/material'

import PanelTitle from '../../components/PanelTitle/PanelTitle'
import ServiceInfo from '../../components/ServiceInfo/ServiceInfo'
import SearchServiceInput from '../../components/SearchServiceInput/SearchServiceInput'
import filterServicesInfo from '../../utils/filterServicesInfo'
/**
 *
 * @param {Object} props.federationServices result of prepareServicesViewData
 * @returns {JSX.Element}
 */
const ServicesView = ({ federationServices }) => {
  const [query, setQuery] = useState('')
  const defferedQuery = useDeferredValue(query)

  const filteredServices = useMemo(
    () => filterServicesInfo(federationServices, query),
    [defferedQuery]
  )

  const services = defferedQuery ? filteredServices : federationServices

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: '200px',
        flex: 1
      }}
    >
      <PanelTitle total={federationServices.length}>Services</PanelTitle>
      <SearchServiceInput
        query={defferedQuery}
        setQuery={setQuery}
      ></SearchServiceInput>
      <Box sx={{ overflow: 'auto', paddingRight: 2 }}>
        {services.map(({ serviceName, itemsMap }) => (
          <ServiceInfo
            key={serviceName}
            serviceName={serviceName}
            itemsMap={itemsMap}
          />
        ))}
      </Box>
    </Box>
  )
}

export default ServicesView

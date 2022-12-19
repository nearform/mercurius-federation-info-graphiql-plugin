import React, { useMemo, useState } from 'react'
import { Box } from '@mui/material'

import PanelTitle from '../../components/PanelTitle/PanelTitle'
import ServiceInfo from '../../components/ServiceInfo/ServiceInfo'
import SearchServiceInput from '../../components/SearchServiceInput/SearchServiceInput'
import filterServicesInfo from '../../utils/filterServicesInfo'
import { useDebounce } from 'use-debounce'
/**
 *
 * @param {Object} props.federationServices result of prepareServicesViewData
 * @returns {JSX.Element}
 */
const ServicesView = ({ federationServices }) => {
  const [searchText, setSearchText] = useState('')
  const [debouncedSearchText] = useDebounce(searchText, 150)

  const filteredServices = useMemo(
    () => filterServicesInfo(federationServices, debouncedSearchText),
    [federationServices, debouncedSearchText]
  )

  const services = debouncedSearchText ? filteredServices : federationServices

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
        query={searchText}
        setQuery={setSearchText}
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

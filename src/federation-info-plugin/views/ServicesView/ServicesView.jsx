import React, { useMemo, useState, useEffect } from 'react'
import { Box } from '@mui/material'

import PanelTitle from '../../components/PanelTitle/PanelTitle'
import ServiceInfo from '../../components/ServiceInfo/ServiceInfo'
import SearchServiceInput from '../../components/SearchServiceInput/SearchServiceInput'
import filterServicesInfo from '../../utils/filterServicesInfo'
import { useDebounce } from 'use-debounce'
import { usePluginState } from '../../context/PluginState'
/**
 *
 * @param {Object} props.federationServices result of prepareServicesViewData
 * @returns {JSX.Element}
 */
const ServicesView = ({ federationServices }) => {
  const { setTreeOpenState, setServicesSearchQuery, searchServicesQuery } =
    usePluginState()
  const [searchText, setSearchText] = useState(searchServicesQuery)
  const [debouncedSearchText] = useDebounce(searchText, 150)

  const { filteredServices, treeOpenState } = useMemo(() => {
    return filterServicesInfo(federationServices, debouncedSearchText)
  }, [federationServices, debouncedSearchText])

  useEffect(() => {
    if (searchServicesQuery !== debouncedSearchText) {
      setServicesSearchQuery(debouncedSearchText)
    }
    //not including the setServicesSearchQuery, should never change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchText])

  useEffect(() => {
    if (searchText && treeOpenState) {
      setTreeOpenState(treeOpenState)
    }
    // not including the setTreeOpenState, it should not trigger the hook
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [treeOpenState])

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

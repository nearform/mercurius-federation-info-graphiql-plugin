import React from 'react'
import { Box } from '@mui/material'

import PanelTitle from '../../components/PanelTitle/PanelTitle'
import ServiceInfo from '../../components/ServiceInfo/ServiceInfo'

/**
 *
 * @param {Object} props.federationServices result of prepareServicesViewData
 * @returns  {JSX.Element}
 */
const ServicesView = ({ federationServices }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '200px' }}>
      <PanelTitle total={federationServices.length}>Services</PanelTitle>
      <Box sx={{ overflow: 'auto', height: '82vh' }}>
        {federationServices.map(({ serviceName, itemsMap }) => (
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

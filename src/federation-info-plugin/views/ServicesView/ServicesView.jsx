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
    <Box xs={{ display: 'flex', flexDirection: 'column', minWidth: '200px' }}>
      <PanelTitle>Services</PanelTitle>
      <Box xs={{ overflow: 'auto', height: '82vh' }}>
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

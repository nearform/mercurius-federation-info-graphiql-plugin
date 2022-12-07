import React, { useMemo } from 'react'
import { TypeKind } from 'graphql'

import ServiceButton from '../ServiceButton/ServiceButton'
import ServiceItem from '../ServiceItem/ServiceItem'
import { usePluginState } from '../../context/PluginState'

import { Collapse, Box } from '@mui/material'

const UNSUPPORTED_TYPES = [TypeKind.INTERFACE, TypeKind.SCALAR, TypeKind.ENUM]

/**
 *
 * @param {number} props.serviceName name of the service
 * @param {Object} props.itemsMap GraphQL definitions exposed by the service
 *
 * @returns {JSX.Element}
 */
const ServiceInfo = ({ serviceName, itemsMap }) => {
  const { openServices, setServiceOpen, setServiceClosed } = usePluginState()

  const showTree = useMemo(
    () => openServices.includes(serviceName),
    [openServices, serviceName]
  )

  const supportedItemsMap = Object.values(itemsMap).filter(
    type => !UNSUPPORTED_TYPES.includes(type.kind)
  )

  const total = supportedItemsMap.reduce(
    (total, type) => total + Object.values(type.itemsMap || []).length,
    0
  )

  const handleButtonChange = () => {
    // Need to negate the showTree because it still contains the old value
    const isTreeVisible = !showTree
    isTreeVisible ? setServiceOpen(serviceName) : setServiceClosed(serviceName)
  }

  return (
    <Box>
      <ServiceButton
        serviceName={serviceName}
        total={total}
        selected={showTree}
        onChange={handleButtonChange}
      />
      <Collapse in={showTree} sx={{ marginBottom: 2 }}>
        <ServiceItem
          supportedItemsMap={supportedItemsMap}
          serviceName={serviceName}
          sx={{ marginTop: 1 }}
        />
      </Collapse>
    </Box>
  )
}

export default ServiceInfo

import React, { useState } from 'react'
import { TypeKind } from 'graphql'

import ServiceButton from '../ServiceButton/ServiceButton'
import ServiceItem from '../ServiceItem/ServiceItem'

import { Collapse, Box } from '@mui/material'

const UNSUPPORTED_TYPES = [TypeKind.INTERFACE, TypeKind.SCALAR, TypeKind.ENUM]

const ServiceInfo = ({ serviceName, itemsMap }) => {
  const [showTree, setShowTree] = useState(false)
  const supportedItemsMap = Object.values(itemsMap).filter(
    type => !UNSUPPORTED_TYPES.includes(type.kind)
  )

  const total = supportedItemsMap.reduce(
    (total, type) => total + Object.values(type.itemsMap || []).length,
    0
  )

  const handleButtonChange = () => {
    setShowTree(oldValue => !oldValue)
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

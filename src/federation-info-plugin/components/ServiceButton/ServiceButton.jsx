import React from 'react'

import { ToggleButton, Chip, Box } from '@mui/material'

const ServiceButton = ({ serviceName, total, onChange, selected = false }) => {
  return (
    <ToggleButton
      fullWidth={true}
      sx={{
        borderRadius: 8,
        paddingX: 2,
        textTransform: 'capitalize'
      }}
      color="primary"
      selected={selected}
      onChange={onChange}
      value={serviceName}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {serviceName}
        <Chip label={total} size="small" />
      </Box>
    </ToggleButton>
  )
}

export default ServiceButton

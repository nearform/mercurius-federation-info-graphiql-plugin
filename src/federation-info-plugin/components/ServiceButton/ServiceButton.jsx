import React from 'react'

import { ToggleButton, Chip, Box } from '@mui/material'

const ServiceButton = ({ serviceName, total, onChange, selected = false }) => {
  return (
    <ToggleButton
      variant="contained"
      fullWidth={true}
      sx={{ borderRadius: 8, paddingX: 2, textTransform: 'capitalize' }}
      size="small"
      selected={selected}
      onChange={onChange}
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
        <Chip
          label={total}
          size="small"
          sx={{ bgcolor: 'white', color: 'primary' }}
        />
      </Box>
    </ToggleButton>
  )
}

export default ServiceButton

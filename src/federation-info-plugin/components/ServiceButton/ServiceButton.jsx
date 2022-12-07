import React from 'react'

import { ToggleButton, Chip, Box } from '@mui/material'

/**
 * @param {string} props.serviceName name of the service
 * @param {number} props.total number of services to display next to the service name
 * @param {boolean} props.selected 	if true, the button is rendered in an active state
 * @param {Function} props.onChange callback fired when the state changes
 *
 * @returns {JSX.Element}
 */
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
      size="small"
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

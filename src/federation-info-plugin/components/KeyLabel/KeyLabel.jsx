import React from 'react'
import { Chip } from '@mui/material'
import KeyIcon from '@mui/icons-material/Key'

/**
 * @returns {JSX.Element}
 */
const KeyLabel = () => {
  return (
    <Chip
      size="small"
      color="success"
      icon={<KeyIcon />}
      sx={{
        '.MuiChip-label': {
          display: 'none'
        },
        '.MuiChip-icon': {
          marginRight: 0.5
        }
      }}
    />
  )
}

export default KeyLabel

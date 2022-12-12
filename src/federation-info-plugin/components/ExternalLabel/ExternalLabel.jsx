import React from 'react'
import { Chip } from '@mui/material'

/**
 * @param {Object} props.field graphql field
 *
 * @returns {JSX.Element}
 */
const ExternalLabel = ({ field }) => {
  if (!(field || {}).isExternal) {
    return undefined
  }

  return <Chip label="@external" size="small" color="warning" />
}

export default ExternalLabel

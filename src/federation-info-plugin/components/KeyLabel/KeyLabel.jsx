import React from 'react'
import { Chip } from '@mui/material'

/**
 * @param {Object} props.type graphql type
 *
 * @returns {JSX.Element}
 */
const KeyLabel = ({ type }) => {
  const { key } = type || {}
  if (!key) {
    return undefined
  }
  const keyNames = key.map(key => key.value)

  return (
    <Chip label={`@key(${keyNames.join(', ')})`} size="small" color="primary" />
  )
}

export default KeyLabel

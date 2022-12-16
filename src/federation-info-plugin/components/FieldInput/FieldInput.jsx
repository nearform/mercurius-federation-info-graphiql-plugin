import React from 'react'
import { Box } from '@mui/material'

import introspectionTypeToString from '../../lib/introspectionTypeToString'

/**
 *
 * @param {Object} props.field grqphql field
 *
 * @returns {JSX.Element}
 */
const FieldInput = ({ field }) => {
  const { args } = field || {}
  if (!args || !args.length) {
    return undefined
  }

  return (
    <Box
      component="span"
      sx={{
        paddingLeft: 0.4
      }}
    >
      (
      {args.map(
        ({ type, name }) => `${name}: ${introspectionTypeToString(type)}`
      )}
      )
    </Box>
  )
}

export default FieldInput

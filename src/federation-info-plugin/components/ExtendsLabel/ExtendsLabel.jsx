import React from 'react'
import { Chip } from '@mui/material'

/**
 * @param {Object} props.type graphql type
 *
 * @returns {JSX.Element}
 */
const ExtendsLabel = ({ type }) => {
  if (!(type || {}).isExtension) {
    return null
  }

  return <Chip label="@extends" size="small" color="primary" />
}

export default ExtendsLabel

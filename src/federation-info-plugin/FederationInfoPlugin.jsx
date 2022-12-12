import React from 'react'

import {
  Icon,
  FederationInfoEntryPoint
} from './FederationInfoEntryPoint/FederationInfoEntryPoint'

export function federationInfoPlugin(props) {
  return {
    title: props.title || 'Federation info explorer',
    icon: () => <Icon />,
    content: () => <FederationInfoEntryPoint {...props} />
  }
}

export function umdPlugin(props) {
  return federationInfoPlugin(props)
}

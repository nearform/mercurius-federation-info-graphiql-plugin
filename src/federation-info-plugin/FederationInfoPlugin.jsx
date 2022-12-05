import React from 'react'

import { Icon, FederationInfoContent } from './FederationInfo/FederationInfo'

export function federationInfoPlugin(props) {
  return {
    title: props.title || 'Federation info explorer',
    icon: () => <Icon />,
    content: () => <FederationInfoContent {...props} />
  }
}

export function umdPlugin(props) {
  return federationInfoPlugin(props)
}

import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'

import FederationInfoContent from '../FederationInfo/FederationInfo'
import { PluginStateProvider } from '../context/PluginState'
import PluginThemeProvider from '../context/PluginThemeProvider'

import ShareNodes from '../icons/share-nodes.svg?react'

const FederationInfoEntryPoint = props => (
  <PluginStateProvider>
    <PluginThemeProvider>
      <CssBaseline />
      <FederationInfoContent {...props} />
    </PluginThemeProvider>
  </PluginStateProvider>
)

const Icon = () => <ShareNodes fill="currentColor" data-testid="plugin-icon" />

export { FederationInfoEntryPoint, Icon }

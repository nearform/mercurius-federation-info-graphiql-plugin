import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import { ReactComponent as ShareNodes } from '../icons/share-nodes.svg'

import FederationInfoContent from '../FederationInfo/FederationInfo'
import { PluginStateProvider } from '../context/PluginState'
import useGraphiqlTheme from '../hooks/useGraphiqlTheme'

const FederationInfoEntryPoint = props => {
  const themeMode = useGraphiqlTheme()

  const theme = createTheme({
    palette: {
      mode: themeMode
    }
  })

  return (
    <PluginStateProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FederationInfoContent {...props} />
      </ThemeProvider>
    </PluginStateProvider>
  )
}

const Icon = () => <ShareNodes fill="currentColor" data-testid="plugin-icon" />

export { FederationInfoEntryPoint, Icon }

import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useTheme } from '@graphiql/react'

import { ReactComponent as ShareNodes } from '../icons/share-nodes.svg'

import FederationInfoContent from '../FederationInfo/FederationInfo'
import { PluginStateProvider } from '../context/PluginState'

const lightTheme = createTheme({
  palette: {
    mode: 'light'
  }
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const FederationInfoEntryPoint = props => {
  const { theme } = useTheme()

  return (
    <PluginStateProvider>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <CssBaseline />
        <FederationInfoContent {...props} />
      </ThemeProvider>
    </PluginStateProvider>
  )
}

const Icon = () => <ShareNodes fill="currentColor" data-testid="plugin-icon" />

export { FederationInfoEntryPoint, Icon }

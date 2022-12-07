import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useTheme } from '@graphiql/react'

import { ReactComponent as ShareNodes } from '../icons/share-nodes.svg'

import FederationInfoContent from '../FederationInfo/FederationInfo'

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

const Icon = () => <ShareNodes fill="currentColor" data-testid="plugin-icon" />

const FederationInfoEntryPoint = props => {
  const { theme } = useTheme()

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <FederationInfoContent {...props} />
    </ThemeProvider>
  )
}

export { FederationInfoEntryPoint, Icon }

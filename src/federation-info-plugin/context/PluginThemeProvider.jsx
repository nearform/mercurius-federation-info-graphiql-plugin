import React from 'react'
import { ThemeProvider, createTheme, alpha } from '@mui/material/styles'
import { blue } from '@mui/material/colors'

import useGraphiqlTheme from '../hooks/useGraphiqlTheme'

const baseTheme = {
  status: {
    expanded: alpha(blue['700'], 0.05)
  }
}

const darkTheme = {
  palette: {
    background: {
      paper: 'transparent'
    }
  }
}

const PluginThemeProvider = props => {
  const themeMode = useGraphiqlTheme()

  const theme = createTheme(
    {
      palette: {
        mode: themeMode
      }
    },
    baseTheme,
    themeMode === 'dark' ? darkTheme : {}
  )

  return <ThemeProvider {...props} theme={theme} />
}

export default PluginThemeProvider

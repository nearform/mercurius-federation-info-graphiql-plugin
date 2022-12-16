import React from 'react'
import { ThemeProvider, createTheme, alpha } from '@mui/material/styles'
import { blue, grey } from '@mui/material/colors'

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
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: grey['600']
        }
      }
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

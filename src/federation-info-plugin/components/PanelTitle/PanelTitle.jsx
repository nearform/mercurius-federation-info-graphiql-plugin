import React from 'react'
import { useTheme } from '@mui/material'

const PanelTitle = ({ children }) => {
  const theme = useTheme()
  return (
    <h2
      style={{
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
      }}
    >
      {children}
    </h2>
  )
}

export default PanelTitle

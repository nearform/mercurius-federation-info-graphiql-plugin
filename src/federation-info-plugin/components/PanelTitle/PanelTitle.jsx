import React from 'react'
import { Chip, Box } from '@mui/material'

/**
 * @param {number} props.total number of elements to display near the title
 *
 * @returns {JSX.Element}
 */
const PanelTitle = ({ children, total }) => (
  <Box
    sx={{
      width: '100%',
      paddingY: 1,
      display: 'flex',
      alignItems: 'center',
      gap: 1
    }}
  >
    <h2 style={{ margin: 0 }}>{children}</h2>
    {total && <Chip label={total} size="small" color="info" />}
  </Box>
)

export default PanelTitle

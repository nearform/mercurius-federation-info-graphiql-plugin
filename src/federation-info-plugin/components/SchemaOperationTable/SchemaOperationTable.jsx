import React from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableHead,
  TableBody,
  TableRow,
  alpha
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined'

import { usePluginState } from '../../context/PluginState'

const StyledAccordionSummary = props => {
  const theme = useTheme()
  return (
    <AccordionSummary
      {...props}
      expandIcon={<ExpandCircleDownOutlinedIcon />}
      sx={{
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper': {
          paddingX: 1,
          transform: 'rotate(270deg)'
        },
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
          color: 'primary.main',
          transform: 'rotate(360deg)'
        },
        '& h3': {
          fontWeight: 'normal'
        },
        '&.Mui-expanded h3': {
          fontWeight: 'bold'
        },
        '&.Mui-expanded': {
          backgroundColor: alpha(theme.palette.primary.main, 0.05)
        }
      }}
    />
  )
}

const SchemaOperationTable = ({
  id,
  name,
  fields,
  nested = false,
  showReference,
  headerRender,
  rowRender
}) => {
  const theme = useTheme()
  const { openSchemaTables, setSchemaTableOpen, setSchemaTableClosed } =
    usePluginState()

  if (!fields) {
    return null
  }

  const accordionId = id || name
  const isExpanded = openSchemaTables.includes(accordionId)

  const handleAccordionChange = (event, expanded) => {
    expanded
      ? setSchemaTableOpen(accordionId)
      : setSchemaTableClosed(accordionId)
  }

  return (
    <Accordion expanded={isExpanded} onChange={handleAccordionChange}>
      {name && (
        <StyledAccordionSummary>
          <h3>{name}</h3>
        </StyledAccordionSummary>
      )}
      <AccordionDetails sx={{ ...(nested ? { paddingY: 0 } : { padding: 0 }) }}>
        <Table>
          <TableHead
            sx={{
              textTransform: 'uppercase',
              backgroundColor: alpha(theme.palette.primary.main, 0.1)
            }}
          >
            <TableRow>{headerRender({ showReference })}</TableRow>
          </TableHead>

          <TableBody>
            {fields.map(field => rowRender({ field, showReference }))}
          </TableBody>
        </Table>
      </AccordionDetails>
    </Accordion>
  )
}

export default SchemaOperationTable

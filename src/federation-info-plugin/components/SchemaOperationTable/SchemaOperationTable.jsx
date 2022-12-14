import React from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableHead,
  TableBody,
  TableRow
} from '@mui/material'
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined'

import { usePluginState } from '../../context/PluginState'

const SchemaOperationTable = ({
  id,
  name,
  fields,
  showReference,
  headerRender,
  rowRender
}) => {
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
        <AccordionSummary
          expandIcon={<ExpandCircleDownOutlinedIcon />}
          sx={{
            flexDirection: 'row-reverse',
            '& .MuiAccordionSummary-expandIconWrapper': {
              paddingX: 1,
              transform: 'rotate(270deg)'
            },
            '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
              transform: 'rotate(360deg)'
            }
          }}
        >
          <h3>{name}</h3>
        </AccordionSummary>
      )}
      <AccordionDetails>
        <Table>
          <TableHead>
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

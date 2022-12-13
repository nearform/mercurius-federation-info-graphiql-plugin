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

import { usePluginState } from '../../context/PluginState'

const SchemaOperationTable = ({
  id,
  name,
  fields,
  showReference,
  headerRender,
  rowRender
}) => {
  const { openSchemas, setSchemaOpen, setSchemaClosed } = usePluginState()
  if (!fields) {
    return null
  }

  const accordionId = id || name

  const isExpanded = openSchemas.includes(accordionId)

  const handleAccordionChange = (event, expanded) => {
    expanded ? setSchemaOpen(accordionId) : setSchemaClosed(accordionId)
  }

  return (
    <Accordion expanded={isExpanded} onChange={handleAccordionChange}>
      {name && (
        <AccordionSummary>
          <h2>{name}</h2>
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

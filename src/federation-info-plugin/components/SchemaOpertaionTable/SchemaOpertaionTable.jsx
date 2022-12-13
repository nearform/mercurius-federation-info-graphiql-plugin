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

const SchemaOperationTable = ({
  name,
  fields,
  showReference,
  headerRender,
  rowRender
}) => {
  if (!fields) {
    return null
  }

  return (
    <Accordion>
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

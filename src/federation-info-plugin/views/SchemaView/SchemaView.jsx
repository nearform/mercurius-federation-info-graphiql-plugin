import React, { useState, useMemo } from 'react'
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  Collapse
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import PanelTitle from '../../components/PanelTitle/PanelTitle'
import OldSchemaView from './OldSchemaView'

const OperationsTable = ({
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

const FieldRow = ({ field, showReference }) => {
  const input = field.args
    ? field.args.map(({ type, name }) => `${name}: ${type.toString()}`)
    : ''

  return (
    <TableRow key={field.name}>
      <TableCell>{field.name}</TableCell>
      <TableCell>{input}</TableCell>
      <TableCell>{field.type.toString()}</TableCell>
      <TableCell>{field.ownerServices.join(',')}</TableCell>
      {showReference && <TableCell>{field.referencedBy.join(',')}</TableCell>}
    </TableRow>
  )
}

const FieldsTable = props => (
  <OperationsTable
    {...props}
    headerRender={({ showReference }) => (
      <>
        <TableCell>
          <TableSortLabel>Name</TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel>Input</TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel>Type</TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel>Owner service</TableSortLabel>
        </TableCell>
        {showReference && (
          <TableCell>
            <TableSortLabel>Referenced by</TableSortLabel>
          </TableCell>
        )}
      </>
    )}
    rowRender={({ field, showReference }) => (
      <FieldRow field={field} showReference={showReference} />
    )}
  />
)

const TypeRow = ({ type }) => {
  const [open, setOpen] = useState(false)
  const areTypeFieldsEmpty = type.fields.length === 0
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            size="small"
            disabled={areTypeFieldsEmpty}
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{type.name}</TableCell>
        <TableCell>{type.ownerServices.join(', ')}</TableCell>
        <TableCell>
          {type.referencedBy
            .map(
              ({ serviceName, key }) => `${serviceName} @key(${key[0].value})`
            )
            .join(<br />)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ padding: 0 }} colSpan={4}>
          {!areTypeFieldsEmpty && (
            <Collapse in={open} timeout="auto">
              <FieldsTable fields={type.fields} showReference />
            </Collapse>
          )}
        </TableCell>
      </TableRow>
    </>
  )
}

const TypeFieldsTable = props => (
  <OperationsTable
    {...props}
    headerRender={() => (
      <>
        <TableCell />
        <TableCell>Name</TableCell>
        <TableCell>Defined By</TableCell>
        <TableCell>Extended by</TableCell>
      </>
    )}
    rowRender={({ field }) => <TypeRow key={field.name} type={field} />}
  />
)

const SchemaView = ({ schemaViewData, rootTypes }) => {
  //extracts the root types
  const { queries, mutations, subscriptions, types } = useMemo(() => {
    let queries, mutations, subscriptions
    let types = []
    for (const type of schemaViewData) {
      if (type.name === rootTypes.queries) {
        queries = type.fields
      } else if (type.name === rootTypes.mutations) {
        mutations = type.fields
      } else if (type.name === rootTypes.subscriptions) {
        subscriptions = type.subscriptions
      } else {
        types.push(type)
      }
    }
    return { queries, mutations, subscriptions, types }
  }, [schemaViewData, rootTypes])

  return (
    <Box sx={{ display: 'flex', flex: '4', flexDirection: 'column' }}>
      <PanelTitle>Overall schema</PanelTitle>

      <Box>
        <FieldsTable name={'Queries'} fields={queries} />
        <FieldsTable name={'Mutations'} fields={mutations} />
        <FieldsTable name={'Subscriptions'} fields={subscriptions} />
        <TypeFieldsTable name={'Types'} fields={types} />
      </Box>

      <OldSchemaView {...{ queries, mutations, subscriptions, types }} />
    </Box>
  )
}

export default SchemaView

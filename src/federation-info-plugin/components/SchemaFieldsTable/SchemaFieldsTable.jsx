import React, { useState } from 'react'
import { TableRow, TableCell, TableSortLabel } from '@mui/material'

import SchemaOperationTable from '../SchemaOperationTable/SchemaOperationTable'

import {
  fieldArgsToValue,
  fieldTypeToValue,
  fieldOwnerServicesToValue,
  fieldReferencedByToValue
} from '../../utils/schemaFieldToTableCellValue'

const FieldHeader = ({ showReference, order, orderBy, createSortHandler }) => {
  return (
    <>
      <TableCell>
        <TableSortLabel
          active={orderBy === 'name'}
          direction={orderBy === 'name' ? order : 'asc'}
          onClick={createSortHandler('name')}
        >
          Name
        </TableSortLabel>
      </TableCell>
      <TableCell>
        <TableSortLabel
          active={orderBy === 'input'}
          direction={orderBy === 'input' ? order : 'asc'}
          onClick={createSortHandler('input')}
        >
          Input
        </TableSortLabel>
      </TableCell>
      <TableCell>
        <TableSortLabel
          active={orderBy === 'type'}
          direction={orderBy === 'type' ? order : 'asc'}
          onClick={createSortHandler('type')}
        >
          Type
        </TableSortLabel>
      </TableCell>
      <TableCell>
        <TableSortLabel
          active={orderBy === 'ownerServices'}
          direction={orderBy === 'ownerServices' ? order : 'asc'}
          onClick={createSortHandler('ownerServices')}
        >
          Owner service
        </TableSortLabel>
      </TableCell>
      {showReference && (
        <TableCell>
          <TableSortLabel
            active={orderBy === 'referencedBy'}
            direction={orderBy === 'referencedBy' ? order : 'asc'}
            onClick={createSortHandler('referencedBy')}
          >
            Referenced by
          </TableSortLabel>
        </TableCell>
      )}
    </>
  )
}

const FieldRow = ({ field, showReference }) => (
  <TableRow key={field.name} hover>
    <TableCell>{field.name}</TableCell>
    <TableCell>{fieldArgsToValue(field.args)}</TableCell>
    <TableCell>{fieldTypeToValue(field.type)}</TableCell>
    <TableCell>{fieldOwnerServicesToValue(field.ownerServices)}</TableCell>
    {showReference && (
      <TableCell>{fieldReferencedByToValue(field.referencedBy)}</TableCell>
    )}
  </TableRow>
)

const SchemaFieldsTable = ({ onSortChange, ...rest }) => {
  const [order, setOrder] = useState('desc')
  const [orderBy, setOrderBy] = useState(null)

  const createSortHandler = property => () => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)

    onSortChange && onSortChange(property, order)
  }

  return (
    <SchemaOperationTable
      {...rest}
      headerRender={({ showReference }) => (
        <FieldHeader
          showReference={showReference}
          order={order}
          orderBy={orderBy}
          createSortHandler={createSortHandler}
        />
      )}
      rowRender={({ field, showReference }) => (
        <FieldRow
          key={field.name}
          field={field}
          showReference={showReference}
        />
      )}
    />
  )
}

export default SchemaFieldsTable

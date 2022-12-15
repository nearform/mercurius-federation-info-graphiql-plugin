import React, { useCallback, useState, useMemo } from 'react'
import { TableRow, TableCell, TableSortLabel } from '@mui/material'

import SchemaOperationTable from '../SchemaOperationTable/SchemaOperationTable'

import {
  fieldArgsToValue,
  fieldTypeToValue,
  fieldOwnerServicesToValue,
  fieldReferencedByToValue
} from '../../utils/schemaFieldToTableCellValue'

const FieldRow = ({ field, showReference, isLast }) => {
  const noBorderIfLast = isLast ? { borderBottomColor: 'transparent' } : {}
  return (
    <TableRow key={field.name} hover>
      <TableCell sx={noBorderIfLast}>{field.name}</TableCell>
      <TableCell sx={noBorderIfLast}>{fieldArgsToValue(field.args)}</TableCell>
      <TableCell sx={noBorderIfLast}>{fieldTypeToValue(field.type)}</TableCell>
      <TableCell sx={noBorderIfLast}>
        {fieldOwnerServicesToValue(field.ownerServices)}
      </TableCell>
      {showReference && (
        <TableCell sx={noBorderIfLast}>
          {fieldReferencedByToValue(field.referencedBy)}
        </TableCell>
      )}
    </TableRow>
  )
}

const tableColumns = [
  { key: 'name', label: 'Name' },
  { key: 'input', label: 'Input' },
  { key: 'type', label: 'Type' },
  { key: 'ownerServices', label: 'Owner service' }
]

/**
 * The component also accepts all the properties defined into the
 * `SchemaOperationTable` component.
 *
 * @param {Function} props.onSortChange called when the user changes the sort order of one of the table's column
 * @param {boolean} props.showReference show the "Referenced by" column if it is `true`
 * @param {Array} props.fields the list of data to display in the table

 * @returns {JSX.Element}
 */
const SchemaFieldsTable = ({
  onSortChange,
  showReference,
  fields,
  ...rest
}) => {
  const [order, setOrder] = useState('desc')
  const [orderBy, setOrderBy] = useState(null)

  const header = useMemo(() => {
    const createSortHandler = property => () => {
      const isAsc = orderBy === property && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)

      onSortChange && onSortChange(property, order)
    }

    const allTableColumns = [...tableColumns]
    if (showReference) {
      allTableColumns.push({ key: 'referencedBy', label: 'Referenced by' })
    }

    return allTableColumns.map(({ key, label }) => (
      <TableCell key={key}>
        <TableSortLabel
          active={orderBy === key}
          direction={orderBy === key ? order : 'asc'}
          onClick={createSortHandler(key)}
        >
          {label}
        </TableSortLabel>
      </TableCell>
    ))
  }, [onSortChange, order, orderBy, showReference])

  return (
    <SchemaOperationTable
      {...rest}
      fields={fields}
      header={header}
      rowRender={({ field, index }) => (
        <FieldRow
          key={field.name}
          field={field}
          isLast={index === fields.length - 1}
          showReference={showReference}
        />
      )}
    />
  )
}

export default SchemaFieldsTable

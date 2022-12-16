import React, { useState, useMemo, useCallback } from 'react'
import { TableRow, TableCell, TableSortLabel, Collapse } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined'

import SchemaOperationTable from '../SchemaOperationTable/SchemaOperationTable'
import SchemaFieldsTable from '../SchemaFieldsTable/SchemaFieldsTable'
import {
  typeOwnerServicesToValue,
  typeReferencedByToValue
} from '../../utils/schemaFieldToTableCellValue'
import { usePluginState } from '../../context/PluginState'

const StyledIconButton = ({ isExpanded, ...rest }) => (
  <IconButton
    {...rest}
    size="small"
    disableRipple
    sx={{
      '& .MuiSvgIcon-root': {
        transform: 'rotate(270deg)'
      },
      '&.expanded .MuiSvgIcon-root': {
        color: 'primary.main',
        transform: 'rotate(0deg)'
      }
    }}
    className={isExpanded ? ' expanded' : ''}
  />
)

const TypeRow = ({ id, type, onTypeTableSortChange }) => {
  const { openSchemaTables, setSchemaTableOpen, setSchemaTableClosed } =
    usePluginState()
  const areTypeFieldsEmpty = type.fields.length === 0

  const isExpanded = openSchemaTables.includes(id)
  const handleExpandButtonClick = () => {
    isExpanded ? setSchemaTableClosed(id) : setSchemaTableOpen(id)
  }

  const buttonIcon = areTypeFieldsEmpty ? (
    <RadioButtonUncheckedIcon />
  ) : (
    <ExpandCircleDownOutlinedIcon />
  )

  return (
    <>
      <TableRow hover>
        <TableCell>
          <StyledIconButton
            disabled={areTypeFieldsEmpty}
            onClick={handleExpandButtonClick}
            isExpanded={isExpanded}
          >
            {buttonIcon}
          </StyledIconButton>
        </TableCell>
        <TableCell>{type.name}</TableCell>
        <TableCell>{typeOwnerServicesToValue(type.ownerServices)}</TableCell>
        <TableCell>{typeReferencedByToValue(type.referencedBy)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ padding: 0, borderBottomWidth: 0 }} colSpan={4}>
          {!areTypeFieldsEmpty && (
            <Collapse in={isExpanded} timeout="auto">
              <SchemaFieldsTable
                id={id}
                fields={type.fields}
                onSortChange={onTypeTableSortChange(type.name)}
                showReference
                nested
              />
            </Collapse>
          )}
        </TableCell>
      </TableRow>
    </>
  )
}

const tableColumns = [
  { key: 'name', label: 'Name' },
  { key: 'ownerServices', label: 'Defined By' },
  { key: 'referencedBy', label: 'Extended by' }
]

/**
 * The component also accepts all the properties defined into the
 * `SchemaOperationTable` component.
 *
 * @param {Function} props.onSortChange called when the user changes the sort order of one of the table's column
 * @param {Function} props.onTypeTableSortChange called when the user changes the sort order of one of the nested table's column
 *
 * @returns {JSX.Element}
 */
const SchemaTypesTable = ({ onSortChange, onTypeTableSortChange, ...rest }) => {
  const [order, setOrder] = useState('desc')
  const [orderBy, setOrderBy] = useState(null)

  const createTypeTableSortHandler = useCallback(
    typeName => (property, order) =>
      onTypeTableSortChange && onTypeTableSortChange(typeName, property, order),
    [onTypeTableSortChange]
  )

  const header = useMemo(() => {
    const createSortHandler = property => () => {
      const isAsc = orderBy === property && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)

      onSortChange && onSortChange(property, order)
    }

    return (
      <>
        <TableCell />
        {tableColumns.map(({ key, label }) => (
          <TableCell key={key}>
            <TableSortLabel
              active={orderBy === key}
              direction={orderBy === key ? order : 'asc'}
              onClick={createSortHandler(key)}
            >
              {label}
            </TableSortLabel>
          </TableCell>
        ))}
      </>
    )
  }, [onSortChange, order, orderBy])

  return (
    <SchemaOperationTable
      {...rest}
      header={header}
      rowRender={({ field }) => {
        const id = `${rest.name}_${field.name}`
        return (
          <TypeRow
            key={id}
            id={id}
            type={field}
            onTypeTableSortChange={createTypeTableSortHandler}
          />
        )
      }}
    />
  )
}

export default SchemaTypesTable

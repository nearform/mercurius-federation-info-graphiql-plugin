import React, { useState } from 'react'
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

const TypeHeader = ({ orderBy, order, createSortHandler }) => {
  return (
    <>
      <TableCell />
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
          active={orderBy === 'ownerServices'}
          direction={orderBy === 'ownerServices' ? order : 'asc'}
          onClick={createSortHandler('ownerServices')}
        >
          Defined By
        </TableSortLabel>
      </TableCell>
      <TableCell>
        <TableSortLabel
          active={orderBy === 'referencedBy'}
          direction={orderBy === 'referencedBy' ? order : 'asc'}
          onClick={createSortHandler('referencedBy')}
        >
          Extended by
        </TableSortLabel>
      </TableCell>
    </>
  )
}

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
          <IconButton
            size="small"
            disableRipple
            disabled={areTypeFieldsEmpty}
            onClick={handleExpandButtonClick}
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
          >
            {buttonIcon}
          </IconButton>
        </TableCell>
        <TableCell>{type.name}</TableCell>
        <TableCell>{typeOwnerServicesToValue(type.ownerServices)}</TableCell>
        <TableCell>{typeReferencedByToValue(type.referencedBy)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ padding: 0 }} colSpan={4}>
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

const SchemaTypesTable = ({ onSortChange, onTypeTableSortChange, ...rest }) => {
  const [order, setOrder] = useState('desc')
  const [orderBy, setOrderBy] = useState(null)

  const createSortHandler = property => () => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)

    onSortChange && onSortChange(property, order)
  }

  const createTypeTableSortHandler = typeName => (property, order) =>
    onTypeTableSortChange && onTypeTableSortChange(typeName, property, order)

  return (
    <SchemaOperationTable
      {...rest}
      headerRender={() => (
        <TypeHeader
          order={order}
          orderBy={orderBy}
          createSortHandler={createSortHandler}
        />
      )}
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

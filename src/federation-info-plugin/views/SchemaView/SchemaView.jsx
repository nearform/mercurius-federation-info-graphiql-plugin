import React, { useMemo } from 'react'
import { Box } from '@mui/material'

import PanelTitle from '../../components/PanelTitle/PanelTitle'
import SchemaFieldsTable from '../../components/SchemaFieldsTable/SchemaFieldsTable'
import SchemaTypesTable from '../../components/SchemaTypesTable/SchemaTypesTable'

import {
  fieldArgsToValue,
  fieldTypeToValue,
  fieldOwnerServicesToValue,
  fieldReferencedByToValue,
  typeOwnerServicesToValue,
  typeReferencedByToValue
} from '../../utils/schemaFieldToTableCellValue'

// import OldSchemaView from './OldSchemaView'

const sortFieldsByProperty = (property, order) => (a, b) => {
  let propertyA = a[property]
  let propertyB = b[property]
  if (property === 'input') {
    propertyA = fieldArgsToValue(a.args)
    propertyB = fieldArgsToValue(b.args)
  } else if (property === 'type') {
    propertyA = fieldTypeToValue(propertyA)
    propertyB = fieldTypeToValue(propertyB)
  } else if (property === 'ownerServices') {
    propertyA = fieldOwnerServicesToValue(propertyA)
    propertyB = fieldOwnerServicesToValue(propertyB)
  } else if (property === 'referencedBy') {
    propertyA = fieldReferencedByToValue(propertyA)
    propertyB = fieldReferencedByToValue(propertyB)
  }

  const compareValues = propertyA.localeCompare(propertyB)
  return order === 'asc' ? compareValues : compareValues * -1
}

const sortTypesByProperty = (property, order) => (a, b) => {
  let propertyA = a[property]
  let propertyB = b[property]
  if (property === 'referencedBy') {
    propertyA = typeReferencedByToValue(propertyA)
    propertyB = typeReferencedByToValue(propertyB)
  } else if (property === 'ownerServices') {
    propertyA = typeOwnerServicesToValue(propertyA)
    propertyB = typeOwnerServicesToValue(propertyB)
  }

  const compareValues = propertyA.localeCompare(propertyB)
  return order === 'asc' ? compareValues : compareValues * -1
}

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
        subscriptions = type.fields
      } else {
        types.push(type)
      }
    }

    return { queries, mutations, subscriptions, types }
  }, [schemaViewData, rootTypes])

  const sortQueries = (property, order) =>
    queries.sort(sortFieldsByProperty(property, order))

  const sortMutations = (property, order) =>
    mutations.sort(sortFieldsByProperty(property, order))

  const sortSubscriptions = (property, order) =>
    subscriptions.sort(sortFieldsByProperty(property, order))

  const sortTypes = (property, order) =>
    types.sort(sortTypesByProperty(property, order))

  const sortTypeFieldTable = (typeName, property, order) => {
    const selectedType = types.find(type => type.name === typeName)
    if (selectedType) {
      selectedType.fields.sort(sortFieldsByProperty(property, order))
    }
  }

  return (
    <Box sx={{ display: 'flex', flex: '4', flexDirection: 'column' }}>
      <PanelTitle>Overall schema</PanelTitle>

      <Box>
        <SchemaFieldsTable
          name={'Queries'}
          fields={queries}
          onSortChange={sortQueries}
        />
        <SchemaFieldsTable
          name={'Mutations'}
          fields={mutations}
          onSortChange={sortMutations}
        />
        <SchemaFieldsTable
          name={'Subscriptions'}
          fields={subscriptions}
          onSortChange={sortSubscriptions}
        />
        <SchemaTypesTable
          name={'Types'}
          fields={types}
          onSortChange={sortTypes}
          onTypeTableSortChange={sortTypeFieldTable}
        />
      </Box>

      {/* <OldSchemaView {...{ queries, mutations, subscriptions, types }} /> */}
    </Box>
  )
}

export default SchemaView

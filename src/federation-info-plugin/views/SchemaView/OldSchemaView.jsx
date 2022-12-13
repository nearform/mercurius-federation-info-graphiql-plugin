import React, { useState } from 'react'
import { Box } from '@mui/material'

import styles from './SchemaView.module.scss'

const FieldRowOld = ({ field, showReference }) => {
  const input = field.args
    ? field.args.map(({ type, name }) => `${name}: ${type.toString()}`)
    : ''

  return (
    <tr key={field.name}>
      <td>{field.name}</td>
      <td>{input}</td>
      <td>{field.type.toString()}</td>
      <td>{field.ownerServices.join(',')}</td>
      {showReference && <td>{field.referencedBy.join(',')}</td>}
    </tr>
  )
}

const FieldsTableOld = ({ name, fields, showReference }) => {
  if (!fields) {
    return null
  }

  return (
    <>
      {name && <h2>{name}</h2>}
      <table width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Input</th>
            <th>Type</th>
            <th>Owner service</th>
            {showReference && <th>Referenced by</th>}
          </tr>
        </thead>
        <tbody>
          {fields.map(field => (
            <FieldRowOld
              key={field.name}
              field={field}
              showReference={showReference}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}

const TypeRowOld = ({ type }) => {
  const [expanded, setExpanded] = useState(true)
  return (
    <>
      <tr onClick={() => setExpanded(!expanded)}>
        <td>{type.name}</td>
        <td>{type.ownerServices.join(', ')}</td>
        <td>
          {type.referencedBy
            .map(
              ({ serviceName, key }) => `${serviceName} @key(${key[0].value})`
            )
            .join(<br />)}
        </td>
      </tr>
      {type.fields.length > 0 && expanded && (
        <tr>
          <td colSpan={3} className={styles.attributes}>
            <FieldsTableOld fields={type.fields} showReference />
          </td>
        </tr>
      )}
    </>
  )
}

const OldSchemaView = ({ queries, mutations, subscriptions, types }) => {
  return (
    <Box className={styles.schemaView}>
      <FieldsTableOld name={'Queries'} fields={queries} />
      <FieldsTableOld name={'Mutations'} fields={mutations} />
      <FieldsTableOld name={'Subscriptions'} fields={subscriptions} />
      <h2>Types</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Defined By</th>
            <th>Extended by</th>
          </tr>
        </thead>
        <tbody>
          {types.map(type => (
            <TypeRowOld key={type.name} type={type} />
          ))}
        </tbody>
      </table>
    </Box>
  )
}

export default OldSchemaView

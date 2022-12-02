import React, { useState, useMemo } from 'react'
import styles from './SchemaView.module.scss'

const FieldRow = ({ field, showReference }) => {
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

const FieldsTable = ({ name, fields, showReference }) => {
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
            <FieldRow
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

const TypeRow = ({ type }) => {
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
            <FieldsTable fields={type.fields} showReference />
          </td>
        </tr>
      )}
    </>
  )
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
        subscriptions = type.subscriptions
      } else {
        types.push(type)
      }
    }
    return { queries, mutations, subscriptions, types }
  }, [schemaViewData, rootTypes])

  return (
    <div className={styles.schemaViewContainer}>
      <h3>Overall schema</h3>
      <div className={styles.schemaView}>
        <FieldsTable name={'Queries'} fields={queries} />
        <FieldsTable name={'Mutations'} fields={mutations} />
        <FieldsTable name={'Subscriptions'} fields={subscriptions} />
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
              <TypeRow key={type.name} type={type} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SchemaView

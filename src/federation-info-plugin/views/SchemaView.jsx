import React, { useState } from 'react'
import styles from './SchemaView.module.scss'

const FieldRow = ({ field }) => {
  const input = field.args
    ? field.args.map(({ type, name }) => `${name}: ${type.toString()}`)
    : ''

  return (
    <tr key={field.name}>
      <td>{field.name}</td>
      <td>{input}</td>
      <td>{field.type.toString()}</td>
      <td>{field.ownerServices.join(',')}</td>
      <td>{field.referencedBy.join(',')}</td>
    </tr>
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
            <table width="100%">
              <thead>
                <tr>
                  <th>Attribute name</th>
                  <th>Input</th>
                  <th>Type</th>
                  <th>Owner service</th>
                  <th>Referenced by</th>
                </tr>
              </thead>
              <tbody>
                {type.fields.map(field => (
                  <FieldRow key={field.name} field={field} />
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  )
}

const SchemaView = ({ schemaViewData }) => {
  return (
    <div className={styles.schemaView}>
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
          {schemaViewData.map(type => (
            <TypeRow key={type.name} type={type} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SchemaView

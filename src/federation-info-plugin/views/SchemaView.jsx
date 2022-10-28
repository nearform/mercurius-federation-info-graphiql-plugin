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
      <td>{field.ownerNodes.join(',')}</td>
      <td>{field.referecedBy.join(',')}</td>
    </tr>
  )
}

const TypeRow = ({ type }) => {
  const [expanded, setExpanded] = useState(true)
  return (
    <>
      <tr onClick={() => setExpanded(!expanded)}>
        <td>{type.name}</td>
        <td>{type.ownerNodes.join(', ')}</td>
        <td>
          {type.referecedBy
            .map(({ nodeName, key }) => `${nodeName} @key(${key[0].value})`)
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
                  <th>Owner node</th>
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
      <h2>Entities</h2>
      <table className={styles.entityTable}>
        <thead>
          <tr>
            <th>Entity</th>
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

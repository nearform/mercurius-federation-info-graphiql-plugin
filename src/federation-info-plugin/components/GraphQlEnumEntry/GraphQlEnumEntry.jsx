import styles from './GraphQlEnumEntry.module.scss'
import React from 'react'

/**
 * @param {Object} props.entry Name of the node section.
 * @param {string} props.entry.name Name of the entry section.
 * @param {Array} props.enumValues Data List of nested enums
 * @param {Array} props.enumValues
 *
 * @returns {JSX.Element}
 * @constructor
 */
const GraphQlEnumEntry = ({ entry: graphQlFunctionInfo }) => {
  const { name, enumValues } = graphQlFunctionInfo
  return (
    <div>
      {name}
      {enumValues.map(({ name }) => (
        <div key={name} className={styles.attributeList}>
          {name}
        </div>
      ))}
    </div>
  )
}

export default GraphQlEnumEntry

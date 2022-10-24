import styles from './GraphQlEnumEntry.module.scss'
import React from 'react'

/**
 * TODO: Add props definition here
 * @param graphQlFunctionInfo
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

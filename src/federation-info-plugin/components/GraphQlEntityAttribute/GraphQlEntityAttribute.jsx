import React from 'react'

import styles from './GraphQlEntityAttribute.module.scss'

/**
 * TODO: Add props definition here
 * @param attribute
 * @returns {JSX.Element}
 * @constructor
 */
const GraphQlEntityAttribute = ({ attribute }) => {
  const { name, type, isExternal } = attribute

  const addExternalLabel = () => {
    if (!isExternal) {
      return undefined
    }

    return <span className={styles.externalLabel}>[external]</span>
  }

  return (
    <div className={styles.container}>
      {name}: {type} {addExternalLabel()}
    </div>
  )
}

export default GraphQlEntityAttribute

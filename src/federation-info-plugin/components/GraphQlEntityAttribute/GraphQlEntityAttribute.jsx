import React from 'react'

import styles from './GraphQlEntityAttribute.module.scss'

/**
 * @param {Object} props.attribute Attribute of entity
 * @param {string} props.attribute.name Name of the attribute.
 * @param {string} props.attribute.type Type of the attribute.
 * @param {boolean} props.attribute.isExternal If attribute is external.
 *
 * @returns {JSX.Element}
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

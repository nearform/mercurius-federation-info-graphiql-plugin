import React from 'react'

import GraphQlEntityAttribute from '../GraphQlEntityAttribute/GraphQlEntityAttribute'

import styles from './GraphQlEntityEntry.module.scss'

/**
 * @param {Object} props.entry graphql entitty entry
 * @param {Object} props.entry.name Name of the entity
 * @param {Object} props.entry.attributes Atributes of the entity.
 * @param {boolean} props.entry.isExtension If the entry is an extension 

 * @returns {JSX.Element}
 */
const GraphQlEntityEntry = ({
  /** asasdas */
  entry: graphQlEntity
}) => {
  const { name, attributes, key, isExtension } = graphQlEntity

  const addEntityKeyLabel = () => {
    if (!key) {
      return undefined
    }

    const keyNames = key.map(key => key.value)

    return (
      <span className={styles.entityKeyLabel}>key({keyNames.join(', ')})</span>
    )
  }

  const addEntityExtendsLabel = () => {
    if (!isExtension) {
      return undefined
    }

    return <span className={styles.extendsLabel}>[extends]</span>
  }

  return (
    <div className={styles.container}>
      {name}: {addEntityKeyLabel()} {addEntityExtendsLabel()}
      <div className={styles.attributeList}>
        {attributes.map((attribute, index) => (
          <GraphQlEntityAttribute key={index} attribute={attribute} />
        ))}
      </div>
    </div>
  )
}

export default GraphQlEntityEntry

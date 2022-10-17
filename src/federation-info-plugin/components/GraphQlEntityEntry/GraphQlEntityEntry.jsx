import PropTypes from 'prop-types'

import GraphQlEntityAttribute from '../GraphQlEntityAttribute/GraphQlEntityAttribute'

import styles from './GraphQlEntityEntry.module.scss'

const GraphQlEntityEntry = ({ entry: graphQlEntity }) => {
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

GraphQlEntityEntry.propTypes = {
  entry: PropTypes.object.isRequired
}

export default GraphQlEntityEntry

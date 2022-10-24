import PropTypes from 'prop-types'
import React from 'react'

import styles from './GraphQlEntityAttribute.module.scss'

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

GraphQlEntityAttribute.propTypes = {
  attribute: PropTypes.object.isRequired
}

export default GraphQlEntityAttribute

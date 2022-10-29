import React from 'react'
import styles from './KeyLabel.module.scss'
import joinClassNames from '../../utils/joinClassNames'

/**
 *
 * @param {Object} props.type grqphql type
 * @param {string} props.className className
 *
 * @returns {JSX.Element}
 */
const KeyLabel = ({ type, className, ...otherProps }) => {
  const { key } = type || {}
  if (!key) {
    return undefined
  }

  const keyNames = key.map(key => key.value)

  return (
    <span
      className={joinClassNames(styles.entityKeyLabel, className)}
      {...otherProps}
    >
      @key({keyNames.join(', ')})
    </span>
  )
}

export default KeyLabel

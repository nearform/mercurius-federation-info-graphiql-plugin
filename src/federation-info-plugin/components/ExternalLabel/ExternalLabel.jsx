import React from 'react'
import styles from './ExternalLabel.module.scss'
import joinClassNames from '../../utils/joinClassNames'

/**
 *
 * @param {Object} props.field graphql field
 * @param {string} props.className
 *
 * @returns {JSX.Element}
 */
const ExternalLabel = ({ field, className, ...otherProps }) => {
  if (!(field || {}).isExternal) {
    return undefined
  }

  return (
    <span
      className={joinClassNames(styles.externalLabel, className)}
      {...otherProps}
    >
      @external
    </span>
  )
}

export default ExternalLabel

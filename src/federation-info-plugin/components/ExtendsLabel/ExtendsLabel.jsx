import React from 'react'
import styles from './ExtendsLabel.module.scss'
import joinClassNames from '../../utils/joinClassNames'

/**
 *
 * @param {Object} props.type graphql type
 * @param {string} props.className
 *
 * @returns {JSX.Element}
 */
const ExtendsLabel = ({ type, className, ...otherProps }) => {
  if (!(type || {}).isExtension) {
    return undefined
  }

  return (
    <span
      className={joinClassNames(styles.extendsLabel, className)}
      {...otherProps}
    >
      @extends
    </span>
  )
}

export default ExtendsLabel

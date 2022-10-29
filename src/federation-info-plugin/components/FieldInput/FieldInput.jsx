import React from 'react'
import styles from './FieldInput.module.scss'
import joinClassNames from '../../utils/joinClassNames'
import introspectionTypeToString from '../../lib/introspectionTypeToString'

/**
 *
 * @param {Object} props.field grqphql field
 * @param {string} props.className className
 *
 * @returns {JSX.Element}
 */
const FieldInput = ({ field, className, ...otherProps }) => {
  const { args } = field || {}
  if (!args || !args.length) {
    return undefined
  }

  return (
    <span
      className={joinClassNames(styles.fieldInput, className)}
      {...otherProps}
    >
      (
      {args.map(
        ({ type, name }) => `${name}: ${introspectionTypeToString(type)}`
      )}
      )
    </span>
  )
}

export default FieldInput

import React from 'react'
import joinClassNames from '../../utils/joinClassNames'
import styles from './Tabs.module.scss'
import { UnStyledButton } from '@graphiql/react'

export const TabGroup = ({ className, ...props }) => (
  <div className={joinClassNames(styles.tabGroup, className)} {...props} />
)
export const TabButton = ({ className, isActive, ...props }) => (
  <UnStyledButton
    className={joinClassNames(
      styles.tabButton,
      isActive && styles.tabActive,
      className
    )}
    {...props}
  />
)

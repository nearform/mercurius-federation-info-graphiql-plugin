import React from 'react'

import styles from './FederationNodeSection.module.scss'

/**
 * TODO: Add props definition here
 * @param name
 * @param sectionData
 * @param EntryComponent
 * @returns {JSX.Element|undefined}
 * @constructor
 */
const FederationNodeSection = ({
  name,
  sectionData,
  entryComponent: EntryComponent
}) => {
  if (sectionData.length < 1) {
    return undefined
  }

  return (
    <div className={styles.container}>
      {name}:
      <div className={styles.entriesList}>
        {sectionData.map((entry, index) => (
          <EntryComponent key={index} entry={entry} />
        ))}
      </div>
    </div>
  )
}

export default FederationNodeSection

import React from 'react'

import styles from './FederationNodeSection.module.scss'

/**
 * @param {string} props.name Name of the node section.
 * @param {Array} props.sectionData Data of the section.
 * @param {JSX.Element} props.EntryComponent component to use for rendering the section
 *
 * @returns {JSX.Element|undefined}
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

import PropTypes from 'prop-types'
import React from 'react'

import styles from './FederationNodeSection.module.scss'

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

FederationNodeSection.propTypes = {
  name: PropTypes.string.isRequired,
  sectionData: PropTypes.array.isRequired,
  entryComponent: PropTypes.func.isRequired
}

export default FederationNodeSection

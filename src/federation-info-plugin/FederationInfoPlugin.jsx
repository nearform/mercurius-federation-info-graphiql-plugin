import React from 'react'
import PropTypes from 'prop-types'

import styles from './FederationInfoPlugin.module.scss'

const Content = props => {
  const { federationNodes } = props

  const renderAttributeExternalLabel = attribute => {
    if (!attribute.isExternal) {
      return undefined
    }

    return <span className={styles.extendsLabel}>[external]</span>
  }

  const renderAttribute = (attribute, index) => {
    return (
      <li key={index}>
        <p>
          {attribute.name}: {attribute.type}{' '}
          {renderAttributeExternalLabel(attribute)}
        </p>
      </li>
    )
  }

  const renderEntityExtendsLabel = entity => {
    if (!entity.isExtension) {
      return undefined
    }

    return <span className={styles.extendsLabel}>[extends]</span>
  }

  const renderEntityKey = entity => {
    if (!entity.key) {
      return undefined
    }

    const keyNames = entity.key.map(key => key.value)

    return (
      <span className={styles.entityKeyLabel}>key({keyNames.join(', ')})</span>
    )
  }

  const renderEntity = (entity, index) => {
    return (
      <li key={index}>
        <p>
          {entity.name}: {renderEntityKey(entity)}{' '}
          {renderEntityExtendsLabel(entity)}
        </p>
        <ul className={styles.indentedList}>
          {entity.attributes.map((attribute, index) =>
            renderAttribute(attribute, index)
          )}
        </ul>
      </li>
    )
  }

  const renderGraphQlFunction = (graphQl, index) => {
    return (
      <li key={index}>
        {graphQl.name}: {graphQl.returnType}
      </li>
    )
  }

  const renderNodeSection = (sectionName, sectionData, renderEntry) => {
    if (!sectionData || sectionData.length < 1) {
      return undefined
    }

    return (
      <li key={sectionName}>
        <p>{sectionName}:</p>
        <ul className={styles.indentedList}>
          {sectionData.map((entry, index) => renderEntry(entry, index))}
        </ul>
      </li>
    )
  }

  const renderFederationNode = (federationNode, index) => {
    const { name, schema } = federationNode
    const { queries, mutations, entities } = schema

    return (
      <li key={index}>
        <p>
          node <strong>{name}</strong>:
        </p>
        <ul className={styles.indentedList}>
          {renderNodeSection('queries', queries, renderGraphQlFunction)}
          {renderNodeSection('mutations', mutations, renderGraphQlFunction)}
          {renderNodeSection('entities', entities, renderEntity)}
        </ul>
      </li>
    )
  }

  const renderFederationNodes = () => {
    return (
      <ul className={styles.indentedList}>
        {federationNodes.map((federationNode, index) =>
          renderFederationNode(federationNode, index)
        )}
      </ul>
    )
  }

  return (
    <div>
      <h3>Federation Info</h3>
      <div>{renderFederationNodes()}</div>
    </div>
  )
}

const Icon = () => {
  return <p>FI</p>
}

Content.propTypes = {
  federationNodes: PropTypes.array
}

export { Content, Icon }

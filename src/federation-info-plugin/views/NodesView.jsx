import React from 'react'
import styles from './NodesView.module.scss'
import { TypeKind } from 'graphql'
import ExternalLabel from '../components/ExternalLabel/ExternalLabel'
import ExtendsLabel from '../components/ExtendsLabel/ExtendsLabel'
import KeyLabel from '../components/KeyLabel/KeyLabel'
import FieldInput from '../components/FieldInput/FieldInput'

const UNSUPORTED_TYPES = [TypeKind.INTERFACE, TypeKind.SCALAR, TypeKind.ENUM]

/**
 * @param { import('graphql').IntrospectionField & { nodeName: string, typeString: string }} props.field Graphql Type field
 *
 * @returns {JSX.Element}
 */
const NodeGraphqlField = ({ field }) => (
  <div className={styles.container}>
    {field.name}
    <FieldInput field={field} />: {field.typeString}
    <ExternalLabel field={field} />
  </div>
)

/**
 * @param {import('graphql').IntrospectionType} props.type graphql entitty entry
 * @returns {JSX.Element}
 */
const NodeGraphqlType = ({ type }) => (
  <div className={styles.container}>
    {type.name}: <KeyLabel type={type} /> <ExtendsLabel type={type} />
    <div className={styles.attributeList}>
      {Object.values(type.itemsMap).map((field, index) => (
        <NodeGraphqlField key={index} field={field} />
      ))}
    </div>
  </div>
)

/**
 *
 * @param {Object} props.federationNodes result of prepareNodesViewData
 * @returns  {JSX.Element}
 */
const NodesView = ({ federationNodes }) => (
  <div>
    {federationNodes.map(({ nodeName, itemsMap }, index) => (
      <div key={nodeName} className={styles.container}>
        <div className={styles.nodeTitle}>
          <strong>{nodeName}</strong> node:
        </div>
        <div className={styles.sectionsList}>
          {Object.values(itemsMap).map(
            type =>
              !UNSUPORTED_TYPES.includes(type.kind) && (
                <NodeGraphqlType key={type.name} type={type} />
              )
          )}
        </div>
      </div>
    ))}
  </div>
)

export default NodesView

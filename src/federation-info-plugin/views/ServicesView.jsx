import React from 'react'
import styles from './ServicesView.module.scss'
import { TypeKind } from 'graphql'
import ExternalLabel from '../components/ExternalLabel/ExternalLabel'
import ExtendsLabel from '../components/ExtendsLabel/ExtendsLabel'
import KeyLabel from '../components/KeyLabel/KeyLabel'
import FieldInput from '../components/FieldInput/FieldInput'

const UNSUPPORTED_TYPES = [TypeKind.INTERFACE, TypeKind.SCALAR, TypeKind.ENUM]

/**
 * @param { import('graphql').IntrospectionField & { serviceName: string, typeString: string }} props.field Graphql Type field
 *
 * @returns {JSX.Element}
 */
const ServiceGraphqlField = ({ field }) => (
  <div className={styles.container}>
    {field.name}
    <FieldInput field={field} />: {field.typeString}
    <ExternalLabel field={field} />
  </div>
)

/**
 * @param {import('graphql').IntrospectionType} props.type graphql type entry
 * @returns {JSX.Element}
 */
const ServiceGraphqlType = ({ type }) => (
  <div className={styles.container}>
    {type.name}: <KeyLabel type={type} /> <ExtendsLabel type={type} />
    <div className={styles.attributeList}>
      {Object.values(type.itemsMap).map((field, index) => (
        <ServiceGraphqlField key={index} field={field} />
      ))}
    </div>
  </div>
)

/**
 *
 * @param {Object} props.federationServices result of prepareServicesViewData
 * @returns  {JSX.Element}
 */
const ServicesView = ({ federationServices }) => (
  <div className={styles.servicesContainer}>
    <h3>Services</h3>
    <div className={styles.servicesList}>
      {federationServices.map(({ serviceName, itemsMap }, index) => (
        <div key={serviceName} className={styles.container}>
          <div className={styles.serviceTitle}>
            <strong>{serviceName}</strong> service:
          </div>
          <div className={styles.sectionsList}>
            {Object.values(itemsMap).map(
              type =>
                !UNSUPPORTED_TYPES.includes(type.kind) && (
                  <ServiceGraphqlType key={type.name} type={type} />
                )
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default ServicesView

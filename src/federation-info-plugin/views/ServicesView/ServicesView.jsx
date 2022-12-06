import React from 'react'
import styles from './ServicesView.module.scss'

import ServiceInfo from '../../components/ServiceInfo/ServiceInfo'
/**
 *
 * @param {Object} props.federationServices result of prepareServicesViewData
 * @returns  {JSX.Element}
 */
const ServicesView = ({ federationServices }) => {
  return (
    <div className={styles.servicesContainer}>
      <h3>Services</h3>
      <div className={styles.servicesList}>
        {federationServices.map(({ serviceName, itemsMap }) => (
          <ServiceInfo
            key={serviceName}
            serviceName={serviceName}
            itemsMap={itemsMap}
          />
        ))}
      </div>
    </div>
  )
}

export default ServicesView

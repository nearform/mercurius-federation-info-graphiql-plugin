import PropTypes from 'prop-types'

import FederationNodeSection from '../FederationNodeSection/FederationNodeSection'
import GraphQlFunctionEntry from '../GraphQlFunctionEntry/GraphQlFunctionEntry'
import GraphQlEntityEntry from '../GraphQlEntityEntry/GraphQlEntityEntry'
import GraphQlEnumEntry from '../GraphQlEnumEntry/GraphQlEnumEntry'

import styles from './FederationNode.module.scss'

const FederationNode = ({ federationNode }) => {
  const { name, schema } = federationNode
  const { queries, mutations, entities, subscriptions, enums } = schema

  return (
    <div className={styles.container}>
      node <strong>{name}</strong>:
      <div className={styles.sectionsList}>
        {Boolean(queries) && (
          <FederationNodeSection
            name="queries"
            sectionData={queries}
            entryComponent={GraphQlFunctionEntry}
          />
        )}
        {Boolean(mutations) && (
          <FederationNodeSection
            name="mutations"
            sectionData={mutations}
            entryComponent={GraphQlFunctionEntry}
          />
        )}
        {Boolean(subscriptions) && (
          <FederationNodeSection
            name="subscriptions"
            sectionData={subscriptions}
            entryComponent={GraphQlFunctionEntry}
          />
        )}
        {Boolean(entities) && (
          <FederationNodeSection
            name="entities"
            sectionData={entities}
            entryComponent={GraphQlEntityEntry}
          />
        )}
        {Boolean(enums) && (
          <FederationNodeSection
            name="enums"
            sectionData={enums}
            entryComponent={GraphQlEnumEntry}
          />
        )}
      </div>
    </div>
  )
}

FederationNode.propTypes = {
  federationNode: PropTypes.object.isRequired
}

export default FederationNode

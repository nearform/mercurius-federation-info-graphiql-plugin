import PropTypes from 'prop-types'
import styles from './GraphQlEnumEntry.module.scss'

const GraphQlEnumEntry = ({ entry: graphQlFunctionInfo }) => {
  const { name, enumValues } = graphQlFunctionInfo
  return (
    <div>
      {name}
      {enumValues.map(({ name }) => (
        <div key={name} className={styles.attributeList}>
          {name}
        </div>
      ))}
    </div>
  )
}

GraphQlEnumEntry.propTypes = {
  entry: PropTypes.object.isRequired
}

export default GraphQlEnumEntry

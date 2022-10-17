import PropTypes from 'prop-types'

const GraphQlFunctionEntry = ({ entry: graphQlFunctionInfo }) => {
  const { name, returnType } = graphQlFunctionInfo
  return (
    <div>
      {name}: {returnType}
    </div>
  )
}

GraphQlFunctionEntry.propTypes = {
  entry: PropTypes.object.isRequired
}

export default GraphQlFunctionEntry

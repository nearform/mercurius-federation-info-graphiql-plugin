import PropTypes from 'prop-types'
import React from 'react'

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

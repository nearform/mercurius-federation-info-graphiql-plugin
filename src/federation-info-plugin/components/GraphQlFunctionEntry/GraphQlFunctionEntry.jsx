import React from 'react'

/**
 * TODO: Add props definition here
 * @param graphQlFunctionInfo
 * @returns {JSX.Element}
 * @constructor
 */
const GraphQlFunctionEntry = ({ entry: graphQlFunctionInfo }) => {
  const { name, returnType } = graphQlFunctionInfo
  return (
    <div>
      {name}: {returnType}
    </div>
  )
}

export default GraphQlFunctionEntry

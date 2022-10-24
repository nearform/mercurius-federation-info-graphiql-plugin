import React from 'react'

/**
 * @param {Object} props.entry
 * @param {string} props.entry.name
 * @param {string} props.entry.returnType
 *
 * @returns {JSX.Element}
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

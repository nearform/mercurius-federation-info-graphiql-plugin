import React from 'react'
import PropTypes from 'prop-types'

import FederationNode from './components/FederationNode/FederationNode'

const Content = props => {
  const { federationNodes, error } = props
  return (
    <div>
      <h3>Federation Info</h3>
      {error && <div>Error fetching federation schema: {error.message}</div>}
      {federationNodes.map((federationNode, index) => (
        <FederationNode key={index} federationNode={federationNode} />
      ))}
    </div>
  )
}

const Icon = () => <div>t</div> // <ShareNodes fill="currentColor" data-testid="plugin-icon" />

Content.propTypes = {
  federationNodes: PropTypes.array,
  error: PropTypes.string
}

export { Content, Icon }

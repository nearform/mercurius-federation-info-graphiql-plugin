import React from 'react'
import PropTypes from 'prop-types'

import FederationNode from './components/FederationNode/FederationNode'

const Content = props => {
  const { federationNodes } = props

  return (
    <div>
      <h3>Federation Info</h3>
      {federationNodes.map((federationNode, index) => (
        <FederationNode key={index} federationNode={federationNode} />
      ))}
    </div>
  )
}

const Icon = () => {
  return <p data-testid="plugin-icon">FI</p>
}

Content.propTypes = {
  federationNodes: PropTypes.array
}

export { Content, Icon }

import React from 'react'
import FederationNode from '../components/FederationNode/FederationNode'

const NodesView = ({ federationNodes }) => (
  <div>
    {federationNodes.map((federationNode, index) => (
      <FederationNode key={index} federationNode={federationNode} />
    ))}
  </div>
)

export default NodesView

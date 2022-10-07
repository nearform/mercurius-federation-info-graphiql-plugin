import React from 'react'
import { GraphiQL } from 'graphiql'

import { useFederationInfoPlugin } from './federation-info-plugin'
import { fetcher } from './utils'

import 'graphiql/graphiql.css'

function App() {
  return (
    <div style={{ height: '100vh' }}>
      <p data-testid="custom-element">This is rendered</p>
      <GraphiQL fetcher={fetcher} plugins={[useFederationInfoPlugin()]} />
    </div>
  )
}

export default App

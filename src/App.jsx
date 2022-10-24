import React from 'react'
import { GraphiQL } from 'graphiql'
import { createGraphiQLFetcher } from '@graphiql/toolkit'

import { federationInfoPlugin } from './federation-info-plugin'

import 'graphiql/graphiql.css'

function App() {
  const federationSchemaUrl = 'http://localhost:3001/federation-schema'

  const fetcher = createGraphiQLFetcher({
    url: 'http://localhost:3001/graphql'
  })

  return (
    <div style={{ height: '100vh' }}>
      <GraphiQL
        fetcher={fetcher}
        plugins={[federationInfoPlugin({ federationSchemaUrl })]}
      />
    </div>
  )
}

export default App

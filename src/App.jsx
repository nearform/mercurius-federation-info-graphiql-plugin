import React from 'react'

import { federationInfoPlugin } from './federation-info-plugin'

import 'graphiql/graphiql.css'
import { createGraphiQLFetcher } from '@graphiql/toolkit'
import { GraphiQL } from 'graphiql/src/components/GraphiQL'

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

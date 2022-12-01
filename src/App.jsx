import React, { useState } from 'react'
import { GraphiQL } from 'graphiql'
import { createGraphiQLFetcher } from '@graphiql/toolkit'

import { federationInfoPlugin } from './federation-info-plugin'

import 'graphiql/graphiql.css'
import './App.scss'

function App() {
  const [hideSecondPanel, setHideSecondPanel] = useState(false)

  const federationSchemaUrl = 'http://localhost:3001/federation-schema'

  const fetcher = createGraphiQLFetcher({
    url: 'http://localhost:3001/graphql'
  })

  return (
    <div
      className={
        hideSecondPanel ? 'full-height hide-second-panel' : 'full-height'
      }
    >
      <GraphiQL
        fetcher={fetcher}
        plugins={[federationInfoPlugin({ federationSchemaUrl })]}
        onTogglePluginVisibility={plugin => {
          if (plugin?.title === 'Federation info explorer') {
            setHideSecondPanel(true)
          } else {
            setHideSecondPanel(false)
          }
        }}
      />
    </div>
  )
}

export default App

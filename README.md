# Mercurius Federation Info GraphiQL Plugin

A [`GraphiQL`](https://github.com/graphql/graphiql) extension to show information about federated schema,
which node is defining specific types and properties and which nodes are referenching them. Requires `mercurius-federation-info` [plugin](https://github.com/nearform/mercurius-federation-info), that provides the neccessary api with the federation info

![alt text](docs/schema.png 'Schema View')

![alt text](docs/nodes.png 'Nodes View')

Check the `mercurius-federation-info` [Github Repo](https://github.com/nearform/mercurius-federation-info) for detailed information.

## Quick start

This plugin is deployed as UMD to unpkg.com and is available
without a direct install in the `GraphiQL` `mercurius` integration.

```javascript
import Fastify from 'fastify'
import mercurius from 'mercurius'
import federationInfo, {
  federationInfoGraphiQLPlugin
} from 'mercurius-federation-info'

const app = Fastify({ logger: true })

const schema = `type Query { add(x: Int, y: Int): Int }`

const resolvers = {
  Query: {
    async add(_, { x, y }) {
      return x + y
    }
  }
}

app.register(mercurius, {
  gateway: {
    services: [
      {
        name: 'node1',
        url: 'http://node1/graphql'
      },
      {
        name: 'node2',
        url: 'http://node2/graphql'
      }
    ]
  },
  graphiql: {
    enabled: true, // Enable GraphiQL
    plugins: [federationInfoGraphiQLPlugin()] // Add Mercurius Federation Info Graphiql Plugin
  }
})

app.register(federationInfo, {
  dependencies: ['mercurius']
})
app.listen({ port: 3000 })
```

## Install in a custom GraphiQL App

The plugin can be installed also in a custom GraphiQL app.

### <a name="GraphiqlServer"></a>Clone and run a sample Graphql server

```bash
git clone https://github.com/nearform/mercurius-federation-info
cd mercurius-federation-info
npm install
npm run example
```

A sample server runs on `http://localhost:3001`.

Test it with:

```bash
curl http://localhost:3001

> {"status":"OK"}
```


### Create the basic GraphiQL app

Create the app using Create React App and install the required modules.

```bash
npx create-react-app custom-graphiql
cd custom-graphiql
npm i graphql graphql-ws
npm i graphiql @graphiql/toolkit @graphiql/react
```

Replace the `App.jsx` with the following content:

```javascript
import React from 'react'
import { GraphiQL } from 'graphiql'
import { createGraphiQLFetcher } from '@graphiql/toolkit'

import 'graphiql/graphiql.css'
import '@graphiql/react/dist/style.css'

function App() {
  const fetcher = createGraphiQLFetcher({
    url: 'http://localhost:3001/graphql'
  })

  return (
    <div
      style={{
        height: '100vh',
        minWidth: '1080px',
        width: '100vw',
        overflow: 'scroll'
      }}
    >
      <GraphiQL fetcher={fetcher} />
    </div>
  )
}

export default App
```

Run the app

```bash
npm start
```

and test it with the query:

```graphql
{
  me {
    id
    name
    posts {
      pid
      title
      content
    }
  }
}
```

### Add the plugin

```bash
npm i mercurius-federation-info-graphiql-plugin
```

add the plugin to the code:

Import the plugin

```javascript
...
import { fetcherReturnToPromise } from '@graphiql/toolkit'
import { federationInfoPlugin } from 'federation-info-plugin'
...

```

add it to the GraphiQL component

```javascript
const federationSchemaUrl = 'http://localhost:3001/federation-schema'

const fetcher = createGraphiQLFetcher({
  url: 'http://localhost:3001/graphql'
})
```

add the plugin to the GraphiQL component

```javascript
...
  <GraphiQL fetcher={fetcher} plugins={[federationInfoPlugin({ federationSchemaUrl })]} />
...
```

The final version of App.jsx

```javascript
import React from 'react'
import { GraphiQL } from 'graphiql'
import { createGraphiQLFetcher } from '@graphiql/toolkit'

import 'graphiql/graphiql.css'
import '@graphiql/react/dist/style.css'

import { federationInfoPlugin } from 'federation-info-plugin'

function App() {
  const federationSchemaUrl = 'http://localhost:3001/federation-schema'

  const fetcher = createGraphiQLFetcher({
    url: 'http://localhost:3001/graphql'
  })

  return (
    <div
      style={{
        height: '100vh',
        minWidth: '1080px',
        width: '100vw',
        overflow: 'scroll'
      }}
    >
      <GraphiQL
        fetcher={fetcher}
        plugins={[federationInfoPlugin({ federationSchemaUrl })]}
      />
    </div>
  )
}

export default App
```

## API

### graphiqlFederationInfoPlugin

The plugin component should be added to the GraphiQL component in the `plugins` list

```
<GraphiQL fetcher={fetcher} plugins={[federationInfoPlugin({ federationSchemaUrl })]}/>
```

## Plugin Development

- Set up the server plugn as [described above](#GraphiqlServer) (server will bind to port 3001)
- Clone this repo
- `cd mercurius-federation-info-graphiql-plugin`
- `npm run start` (call the server on 3001)
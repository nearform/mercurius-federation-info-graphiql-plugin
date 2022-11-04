import { join } from 'desm'

const port = 3001

const config = {
  app: {
    port
  },
  log: { pretty: true },
  autoload: [{ path: join(import.meta.url, './plugins') }],
  graphiql: {
    enabled: true,
    plugins: [
      {
        props: {
          federationSchemaUrl: '/federation-schema'
        },
        name: 'federationInfo',
        umdUrl: `http://localhost:${port}/umd/index.js`
      }
    ]
  }
}

export default config

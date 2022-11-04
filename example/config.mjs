import { join } from 'desm'
import { federationInfoGraphiQLPlugin } from 'mercurius-federation-info'

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
      federationInfoGraphiQLPlugin({
        umdUrlOverride: `http://localhost:${port}/umd/index.js`
      })
    ]
  }
}

export default config

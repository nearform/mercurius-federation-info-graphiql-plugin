import Fastify from 'fastify'
import { mercuriusFederationPlugin } from '@mercuriusjs/federation'

async function createService(name, schema, resolvers, port) {
  const app = Fastify()
  app.register(mercuriusFederationPlugin, {
    schema,
    resolvers,
    federationMetadata: true
  })

  app.get('/', async function () {
    const query = '{ _service { sdl } }'
    return app.graphql(query)
  })

  await app.listen({ port })
}

export default createService

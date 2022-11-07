import Fastify from 'fastify'
import mercurius from 'mercurius'

async function createService(name, schema, resolvers, port) {
  const app = Fastify()
  app.register(mercurius, {
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

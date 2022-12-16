import mercurius from 'mercurius'
import fp from 'fastify-plugin'

export default fp(
  async (fastify, options) => {
    fastify.register(mercurius, {
      graphiql: options.graphiql,
      jit: 1,
      gateway: {
        services: [
          {
            name: 'user service',
            url: 'http://localhost:4001/graphql'
          },
          {
            name: 'post service',
            url: 'http://localhost:4002/graphql'
          }
        ]
      }
    })

    fastify.get('/sdl', async function () {
      const query = '{ _service { sdl } }'
      return fastify.graphql(query)
    })
  },
  {
    name: 'mercurius',
    dependencies: ['service-1', 'service-2']
  }
)

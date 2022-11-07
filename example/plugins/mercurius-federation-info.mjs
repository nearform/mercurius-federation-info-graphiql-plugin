import fp from 'fastify-plugin'
import federationInfo from 'mercurius-federation-info'

export default fp(
  async fastify => {
    fastify.register(federationInfo, {})
  },
  {
    name: 'mercurius-federation-info',
    dependencies: ['mercurius']
  }
)

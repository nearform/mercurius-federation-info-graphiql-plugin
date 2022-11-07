import Fastify from 'fastify'
import config from './config.mjs'
import logger from './logger.mjs'
import services from './app.mjs'

const app = Fastify({
  logger: logger(config.log),
  disableRequestLogging: config.log.disableRequestLogging
})

app.register(services(config))

app.addHook('onClose', (instance, done) => {
  done()
})

async function run(fastifyApp) {
  await fastifyApp.listen({ port: config.app.port, host: '0.0.0.0' })
}

run(app).catch(err => {
  app.log.fatal(err, 'error starting app')
  process.exit(1)
})

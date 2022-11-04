import fp from 'fastify-plugin'
import fs from 'node:fs'
import { join } from 'desm'

export default fp(async fastify => {
  fastify.get('/umd/index.js', (_, reply) => {
    reply.header('Content-Type', 'application/javascript')
    fs.readFile(
      join(import.meta.url, '../../dist/umd/index.js'),
      (err, fileBuffer) => {
        reply.send(err || fileBuffer)
      }
    )
  })
})

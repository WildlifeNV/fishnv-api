import services from './services.js'
import * as schema from './schemas.js'

export default async function (fastify, opts) {
  fastify.register(services)

  fastify.route({
    method: 'GET',
    url: '/',
    schema: schema.fishEntries,
    handler: getFishEntries
  })
}

async function getFishEntries (req, reply) {
  return await this.fishEntries.getAll(req.query)
}

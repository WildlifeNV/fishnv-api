import services from './services.js'
import { fishableWatersSchema } from './schemas.js'

export default async function (fastify, opts) {
  fastify.register(services)

  fastify.route({
    method: 'GET',
    url: '/',
    schema: fishableWatersSchema,
    handler: getFishableWaters
  })
}

async function getFishableWaters (req, reply) {
  // eslint-disable-next-line camelcase
  const { species, water_type, region, county } = req.query
  const data = await this.fishableWaters.getAll({ species, water_type, region, county })

  return data
}

import services from './services.js'
import {
  fishableWatersSchema,
  fishableWatersIdSchema,
  fishableWaters_id_waterRecords as waterRecordsSchema
} from './schemas.js'

export default async function (fastify, opts) {
  fastify.register(services)

  fastify.route({
    method: 'GET',
    url: '/',
    schema: fishableWatersSchema,
    handler: getFishableWaters
  })

  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: fishableWatersIdSchema,
    handler: getFishableWatersById
  })

  fastify.route({
    method: 'GET',
    url: '/:id/water-records',
    schema: waterRecordsSchema,
    handler: getWaterRecords
  })

  fastify.route({
    method: 'GET',
    url: '/:id/nearby-waters',
    handler: getNearbyWaters
  })
}

async function getFishableWaters (req, reply) {
  // eslint-disable-next-line camelcase
  const { species, water_type, region, county } = req.query
  const data = await this.fishableWaters.getAll({ species, water_type, region, county })

  return data
}

async function getFishableWatersById (req, reply) {
  const { id } = req.params
  const data = await this.fishableWaters.getById({ id })

  return data
}

async function getWaterRecords (req, reply) {
  const { id } = req.params
  const data = await this.fishableWaters.getWaterRecords({ id })

  return data
}

async function getNearbyWaters (req, reply) {
  const { id } = req.params
  const data = await this.fishableWaters.getNearbyWaters({ id })

  return data
}

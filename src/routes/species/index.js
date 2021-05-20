import services from './services.js'
import { speciesIdSchema } from './schemas.js'

export default async function (fastify, opts) {
  fastify.register(services)

  // route declarations, use full route object
  fastify.route({
    method: 'GET',
    path: '/',
    handler: getSpecies
  })

  fastify.route({
    method: 'GET',
    path: '/:id',
    schema: speciesIdSchema,
    handler: getSpeciesById
  })

  fastify.route({
    method: 'GET',
    path: '/:id/fish-entries',
    handler: getFishEntries
  })
}

// Declare route handlers
// this = fastify context, this.species = fastify.species
async function getSpecies (req, reply) {
  const data = await this.species.getAll()
  return data
}

async function getSpeciesById (req, reply) {
  const { id } = req.params
  const data = await this.species.getById({ id })
  return data
}

async function getFishEntries ({ params, query }, reply) {
  const { id } = params
  // eslint-disable-next-line camelcase
  const { page, per_page } = query

  const data = await this.species.getFishEntries({ id, page, per_page })
  return data
}

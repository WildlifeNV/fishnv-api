import services from './services.js'

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
    path: '/:name',
    handler: getSpeciesByName
  })
}

// Declare route handlers
// this = fastify context
async function getSpecies (req, reply) {
  const data = await this.species.getAllSpecies()
  return data
}

async function getSpeciesByName (req, reply) {
  const { name } = req.params
  const data = await this.species.getSpeciesByName({ name })
  return data
}

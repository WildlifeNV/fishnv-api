import services from './services.js'

export default async function (fastify, opts) {
  fastify.register(services)

  fastify.route({
    method: 'GET',
    url: '/mercury',
    handler: getMercuryAdvisories
  })
}

async function getMercuryAdvisories (req, reply) {
  return await this.health.getMercuryAdvisories()
}

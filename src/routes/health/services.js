import fp from 'fastify-plugin'
import HealthRepo from './repo.js'

export default fp(async (fastify, opts, next) => {
  const health = HealthRepo(fastify)

  const getMercuryAdvisories = async () => await health.getMercuryAdvisories()

  fastify.decorate('health', {
    getMercuryAdvisories
  })
  next()
})

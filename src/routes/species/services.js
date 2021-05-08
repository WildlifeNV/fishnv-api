import fp from 'fastify-plugin'
import SpeciesRepo from './repo.js'

export default fp(async (fastify, opts, next) => {
  const species = SpeciesRepo(fastify)

  const getAllSpecies = async () => {
    return await species.getAllSpecies()
  }

  const getSpeciesByName = async (params) => {
    return await species.getSpeciesByName({ name: params.name })
  }

  const services = {
    getAllSpecies,
    getSpeciesByName
  }

  fastify.decorate('species', services)
  next()
})

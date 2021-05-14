import fp from 'fastify-plugin'
import SpeciesRepo from './repo.js'

export default fp(async (fastify, opts, next) => {
  const species = SpeciesRepo(fastify)

  const getAll = async () => {
    return await species.getAll()
  }

  const getById = async (params) => {
    return await species.getById({ id: params.id })
  }

  const getFishEntries = async (params) => {
    const limit = params.per_page || 25
    const offset = params.page || 0

    const data = await species.getFishEntries({ id: params.id, limit, offset })
    return {
      data: data.fishEntries,
      page: offset,
      per_page: limit,
      total_records: data.total
    }
  }

  const services = {
    getAll,
    getById,
    getFishEntries
  }

  fastify.decorate('species', services)
  next()
})

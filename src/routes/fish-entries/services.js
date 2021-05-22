import fp from 'fastify-plugin'
import FishEntriesRepo from './repo.js'
import { filters } from '../../utils/pgpUtils.js'
import { pick } from '../../utils/objMethods.js'

export default fp(async (fastify, opts, next) => {
  const fishEntries = FishEntriesRepo(fastify)

  const getAll = async (params) => {
    const { per_page: perPage, page, ...queryParams } = params

    // format query params
    const hasSpeciesId = Object.keys(queryParams).includes('species_id')
    const query = hasSpeciesId ? pick(queryParams, ['water_id', 'species_id']) : queryParams
    const where = filters(query)

    // format pagination params
    const limit = perPage || 25
    const offset = page * limit || 0

    // send request
    const data = await fishEntries.getAll({
      where,
      pagination: { limit, offset }
    })

    return {
      data: data.fishEntries,
      page: page || offset,
      per_page: limit,
      total_records: data.total
    }
  }

  fastify.decorate('fishEntries', {
    getAll
  })
  next()
})

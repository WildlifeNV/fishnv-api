import fp from 'fastify-plugin'
import FishableWatersRepo from './repo.js'
import { filters } from '../../utils/pgpUtils.js'

export default fp(async (fastify, opts, next) => {
  const fishableWaters = FishableWatersRepo(fastify)

  const getAll = async (params) => {
    const where = filters(params)
    return await fishableWaters.getAll(where)
  }

  fastify.decorate('fishableWaters', {
    getAll
  })
  next()
})

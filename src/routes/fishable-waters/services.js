import fp from 'fastify-plugin'
import FishableWatersRepo from './repo.js'
import { filters } from '../../utils/pgpUtils.js'

export default fp(async (fastify, opts, next) => {
  const fishableWaters = FishableWatersRepo(fastify)

  const getAll = async (params) => {
    const where = filters(params)
    return await fishableWaters.getAll(where)
  }

  const getById = async ({ id }) => {
    return await fishableWaters.getById({ id })
  }

  const getWaterRecords = async ({ id }) => {
    return await fishableWaters.getWaterRecords({ id })
  }

  const getNearbyWaters = async ({ id }) => {
    return await fishableWaters.getNearbyWaters({ id })
  }

  fastify.decorate('fishableWaters', {
    getAll,
    getById,
    getWaterRecords,
    getNearbyWaters
  })
  next()
})

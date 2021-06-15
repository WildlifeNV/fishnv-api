import fp from 'fastify-plugin'
import FeatureRepo from './repo.js'

export default fp(async (fastify, opts, next) => {
  const features = FeatureRepo(fastify)

  const getFeaturesList = async () => await features.getFeaturesList()

  const getFeatures = async ({ table, format, query }) => {
    const { species_id: speciesId } = query
    console.log({ query })

    if (format === 'geojson') {
      if (Object.keys(query).length) {
        return await features.getFishableWatersBySpeciesIdGeojson({ id: speciesId })
      }

      return await features.getGeojson({ table, query: undefined })
    }
    if (format === 'geobuf' || format === 'pbf') {
      if (Object.keys(query).length) {
        return await features.getFishableWatersBySpeciesIdGeobuf({ id: speciesId })
      }

      return await features.getGeobuf({ table, query: undefined })
    }
    return {}
  }

  const getFeature = async ({ table, format, id }) => {
    if (format === 'geojson') {
      return await features.getGeojsonById({ table, id })
    }
    if (format === 'geobuf' || format === 'pbf') {
      return await features.getGeobufById({ table, id })
    }
    return {}
  }

  const getMvt = async ({ table, z, x, y }) => await features.getMvt({ table, z, x, y })

  fastify.decorate('features', {
    getFeaturesList,
    getFeatures,
    getFeature,
    getMvt
  })
  next()
})

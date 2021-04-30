import handlers from './controllers.js'

// const getAllSpecies = async ({ db }) => {
//   const sql = 'select * from species'
//   return await db.manyOrNone(sql)
// }

export default async function (fastify, opts) {
  fastify.register(handlers)

  fastify.route({
    method: 'GET',
    path: '/',
    handler: async (request, reply) => {
      const data = await fastify.species.getAllSpecies()
      return data
    }
  })

  fastify.route({
    method: 'GET',
    path: '/:name',
    handler: async (request, reply) => {
      const { name } = request.params
      const data = await fastify.species.getSpeciesByName({ name })
      return data
    }
  })
}

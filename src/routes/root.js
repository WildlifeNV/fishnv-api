export default async function (fastify, opts) {
  fastify.route({
    method: 'GET',
    path: '/',

    handler: async function (request, reply) {
      const data = await fastify.db.manyOrNone('select * from species where id = $<id>', {
        id: 'fc51ea4b-c5bc-4747-a46f-93aa3e1f0c91'
      })

      return { data }
    }
  })
}

export default async function (fastify, opts) {
  fastify.route({
    method: 'GET',
    path: '/',
    handler: async (request, reply) => {
      return 'this is an example'
    }
  })
}

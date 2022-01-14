export default async function (fastify, opts) {
  fastify.route({
    method: 'GET',
    path: '/',
    handler (req, reply) {
      return {
        headers: req.headers,
        ip: req.ip
      }
    }
  })
}

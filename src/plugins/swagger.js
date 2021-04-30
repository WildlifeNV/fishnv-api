import fp from 'fastify-plugin'

export default fp((fastify, opts, next) => {
  fastify.register(import('fastify-swagger'), {
    routePrefix: '_documentation',
    openapi: {
      info: {
        title: 'FishNV REST API',
        description: 'An API to serve data from the FishNV database.',
        version: '2.0.0'
      },
      externalDocs: {
        url: 'https:/swagger.io',
        description: 'Find more info here'
      },
      host: 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
    },
    exposeRoute: true
  })

  next()
}, { name: 'swagger' })

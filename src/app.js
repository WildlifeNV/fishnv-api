import autoload from 'fastify-autoload'
import printRoutes from 'fastify-print-routes'
import fastifyEnv from 'fastify-env'
import { join } from 'desm'

const envOptions = {
  dotenv: true,
  schema: {
    type: 'object',
    required: ['DBURI'],
    properties: {
      DBURI: { type: 'string' }
    }
  }
}

export default async function (fastify, opts) {
  fastify.register(fastifyEnv, envOptions)
  fastify.register(printRoutes)

  // autoload plugins
  fastify.register(autoload, {
    dir: join(import.meta.url, './plugins'),
    options: Object.assign({}, opts)
  })

  // autoload routes
  fastify.register(autoload, {
    dir: join(import.meta.url, './routes'),
    options: Object.assign({}, opts)
  })
}

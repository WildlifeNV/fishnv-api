import autoload from 'fastify-autoload'
import printRoutes from 'fastify-print-routes'
import fastifyEnv from 'fastify-env'
import fastifyCors from 'fastify-cors'
import { join } from 'desm'
import { isDev } from './utils/isDev.js'

const envOptions = {
  dotenv: true,
  schema: {
    type: 'object',
    required: ['DBURI'],
    properties: {
      DBURI: { type: 'string' },
      NODE_ENV: { type: 'string' }
    }
  }
}

export default async function (fastify, opts) {
  // register plugins from the fastify ecosystem
  fastify.register(fastifyEnv, envOptions)
  fastify.register(fastifyCors, {
    origin: '*'
  })

  // register development only plugins
  if (isDev()) {
    fastify.register(printRoutes)
  }

  // register local plugins with the autoload plugin
  fastify.register(autoload, {
    dir: join(import.meta.url, './plugins'),
    options: Object.assign({}, opts)
  })

  // register routes with the autoload plugin
  fastify.register(autoload, {
    dir: join(import.meta.url, './routes'),
    options: Object.assign({}, opts)
  })
}

import Fastify from 'fastify'
import fp from 'fastify-plugin'
import server from '../src/app.js'

export async function build (t, opts = {}) {
  const app = Fastify()
  await app.register(fp(server), {
    testing: true,
    ...opts
  })

  t.teardown(app.close.bind(app))
  return app
}

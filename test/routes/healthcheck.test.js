import t from 'tap'
import fastify from 'fastify'
import fp from 'fastify-plugin'
import app from '../../src/app.js'

const test = t.test

test('load healthcheck', async({ is }) => {
  const server = fastify()
  server.register(fp(app))

  const res = await server.inject('/healthcheck')
  const data = res.json()

  console.log({ data })
  is(data.status, 'ok')

  await server.close()
})

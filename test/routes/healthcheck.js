import tap from 'tap'
import { build } from '../helpers.js'

tap.test('Healthcheck route', async (tap) => {
  const server = await build(tap)
  const response = await server.inject('/healthcheck')
  const body = response.json()

  tap.equal(response.statusCode, 200, 'statusCode is 200')
  tap.equal(body.status, 'ok', 'body.status = ok')
  tap.same(Object.keys(body), ['status', 'timestamp'], 'body has props "status", "timestamp"')
})

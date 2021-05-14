import tap from 'tap'
import { build } from '../helpers.js'

tap.test('GET /species', async (tap) => {
  const server = await build(tap)
  const response = await server.inject('/species')
  const body = response.json()

  tap.equal(response.statusCode, 200, 'statusCode is 200')
  tap.ok(body.length > 0, 'body is greater than 0')
  tap.ok(Object.keys(body[0]).includes('id', 'species'))
})

tap.test('GET /species/:id', async (tap) => {
  const server = await build(tap)

  tap.test('the species exists in the db', async (tap) => {
    const response = await server.inject({
      mehtod: 'GET',
      url: '/species/a7d8eb67-c571-4c0d-8844-75fb00a6ac69'
    })
    const body = response.json()

    tap.equal(response.statusCode, 200, 'statusCode is 200')
    tap.ok(Object.keys(body).includes('id', 'species', 'description'))
  })

  tap.test('the species doesn\'t exist in the database', async (tap) => {
    const response = await server.inject({
      method: 'GET',
      url: '/species/a7d8eb67-1111-1111-1111-75fb00a6ac69'
    })

    tap.equal(response.statusCode, 200, 'statusCode is 200')
  })
})

import fp from 'fastify-plugin'

const getAllSpecies = (fastify) => async () => {
  const sql = 'select * from species'
  return await fastify.db.manyOrNone(sql)
}

const getSpeciesByName = (fastify) => async ({ name }) => {
  const sql = 'select * from species where scientific_name = $<name>'
  return await fastify.db.oneOrNone(sql, { name })
}

export default fp(async (fastify, opts, next) => {
  const controllers = {
    getAllSpecies: getAllSpecies(fastify),
    getSpeciesByName: getSpeciesByName(fastify)
  }

  fastify.decorate('species', controllers)

  next()
})

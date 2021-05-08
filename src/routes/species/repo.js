const SpeciesRepo = ({ db }) => {
  const getAllSpecies = async () => {
    const sql = 'select * from species'
    return await db.manyOrNone(sql)
  }

  const getSpeciesByName = async ({ name }) => {
    const sql = 'select * from species where scientific_name = $<name>'
    return await db.oneOrNone(sql, { name })
  }

  return {
    getAllSpecies,
    getSpeciesByName
  }
}

// export default fp(async (fastify, opts, next) => {
//   const Species = SpeciesRepo(fastify)
//   fastify.decorate('species', Species)
//   next()
// })

export default SpeciesRepo

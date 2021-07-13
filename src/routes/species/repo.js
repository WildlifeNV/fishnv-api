import { join } from 'desm'
import { loadQueryFiles, rewriteNullAsObj } from '../../utils/pgpUtils.js'

const SpeciesRepo = ({ db, pgp }) => {
  const qf = loadQueryFiles(join(import.meta.url, './sql'))

  const getAll = () => {
    const sql = 'select * from species'
    return db.manyOrNone(sql)
  }

  const getById = ({ id }) => {
    const sql = 'select * from species where id = $<id>'
    return db.oneOrNone(
      sql,
      { id },
      rewriteNullAsObj
    )
  }

  const getFishEntries = async ({ id, limit, offset }) => {   
    const queries = [
      { query: qf.fishEntries, values: { id, limit, offset }},
      { query: 'select count(*) from fish_entries where species_id = $<id>', values: { id }}
    ];
    const concat = pgp.helpers.concat(queries)

    const [fishEntries, total] = await db.multi(concat)
    return {
      fishEntries,
      total: total[0].count
    }
  }

  return {
    getAll,
    getById,
    getFishEntries
  }
}

export default SpeciesRepo

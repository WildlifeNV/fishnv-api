import { join } from 'desm'
import { loadQueryFiles, rewriteNullAsObj } from '../../utils/pgpUtils.js'

const SpeciesRepo = ({ db, pgp }) => {
  const qf = loadQueryFiles(join(import.meta.url, './sql'))

  const getAll = async () => {
    const sql = 'select * from species'
    return await db.manyOrNone(sql)
  }

  const getById = async ({ id }) => {
    const sql = 'select * from species where id = $<id>'
    const rows = await db.oneOrNone(
      sql,
      { id },
      rewriteNullAsObj
    )

    return rows
  }

  const getFishEntries = async ({ id, limit, offset }) => {
    const fishEntriesSql = pgp.as.format(qf.fishEntries, { id, limit, offset })
    const countSql = pgp.as.format('select count(*) from fish_entries where species_id = $<id>', { id })
    const concat = pgp.helpers.concat([fishEntriesSql, countSql])

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

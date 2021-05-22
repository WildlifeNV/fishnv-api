import { join } from 'desm'
import { loadQueryFiles } from '../../utils/pgpUtils.js'

const FishEntriesRepo = ({ db, pgp }) => {
  const qf = loadQueryFiles(join(import.meta.url, './sql'))
  const format = pgp.as.format

  const getAll = async ({ where, pagination }) => {
    // generate where clause
    where = where
      .map((filter) => format('$<column:name> $<operator:raw> $<condition>', filter))
      .join(' and ')
    const whereClause = !where ? '' : `where ${where}`

    // generate pagination
    const { limit, offset } = pagination

    // generate sql
    const fishEntriesSql = format(qf.getAll, {
      where: whereClause,
      limit,
      offset
    })
    const countSql = format(qf.countFishEntries, { where: whereClause })
    const concatSql = pgp.helpers.concat([fishEntriesSql, countSql])

    // run query
    const [fishEntries, total] = await db.multi(concatSql)

    return {
      fishEntries,
      total: total[0].total
    }
  }

  return {
    getAll
  }
}

export default FishEntriesRepo

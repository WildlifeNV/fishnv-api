import { join } from 'desm'
import { loadQueryFiles } from '../../utils/pgpUtils.js'

const FishableWatersRepo = ({ db, pgp }) => {
  const qf = loadQueryFiles(join(import.meta.url, './sql'))
  const format = pgp.as.format

  const getAll = async (filters) => {
    const speciesIdx = filters.map(m => m.column).indexOf('species')
    if (speciesIdx >= 0) { filters[speciesIdx].operator = '?' }

    const where = filters
      .map((filter) => format('$<column:name> $<operator:raw> $<condition>', filter))
      .join(' and ')

    const whereClause = !where ? '' : `where ${where}`
    return await db.manyOrNone(qf.getAll, { where: whereClause })
  }

  return {
    getAll
  }
}

export default FishableWatersRepo

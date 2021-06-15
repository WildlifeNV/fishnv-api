import { join } from 'desm'
import { loadQueryFiles } from '../../utils/pgpUtils.js'

const HealthRepo = ({ db, pgp }) => {
  const qf = loadQueryFiles(join(import.meta.url, './sql'))

  const getMercuryAdvisories = async () => await db.many(qf.getMercury)

  return {
    getMercuryAdvisories
  }
}

export default HealthRepo

import pgp from 'pg-promise'
import fs from 'fs'
const { QueryFile } = pgp

export const rewriteNullAsObj = (result) => !result ? {} : result

export const loadQueryFiles = (dir) => {
  const files = fs.readdirSync(dir)

  return files.reduce((acc, file) => {
    const key = camelize(file.split('.')[0])
    const fullpath = `${dir}/${file}`
    const qf = new QueryFile(fullpath, {
      minify: true,
      compress: true
    })
    return Object.assign(acc, { [key]: qf })
  }, {})
}

function camelize (str) {
  // https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
}

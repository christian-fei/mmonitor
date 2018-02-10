const monitors = require('./monitors')
const {serialize} = require('./lib/monitor-utils')
const monk = require('monk')
const db = monk(process.env.MONGO_URI || process.env.npm_config_MONGO_URI)

module.exports = {
  run
}

async function run () {
  const results = {}
  for (const monitor of monitors) {
    const result = await exec(monitor)
    results[serialize(monitor)] = result
  }
  return results
}

async function exec ({collection, type, query = {}, options = {}}) {
  if (type === 'drop') return Promise.reject(new Error('drop not allowed'))
  if (type === 'delete') return Promise.reject(new Error('delete not allowed'))
  if (type === 'length') {
    const result = await db.get(collection).distinct(query, options)
    return result.length
  }

  return db.get(collection)[type](query, options)
}

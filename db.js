const log = require('debug')('mmonitor:db')
const monk = require('monk')
const connectionString = process.env.MONGO_URL || process.env.npm_config_MONGO_URL
log('connectionString', connectionString)
const db = monk(connectionString)

module.exports = {
  run
}

async function run (monitors) {
  const results = []
  for (const monitor of monitors) {
    log(`run monitor "${monitor.type}" on collection ${monitor.collection}`)
    const result = await exec(monitor)
    monitor.result = result
    results.push(monitor)
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

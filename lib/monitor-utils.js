module.exports = {
  serialize
}

function serialize ({collection, type, query = ''}) {
  if (type === 'length') {
    return `${collection}.distinct(${query}).length`
  }
  return `${collection}.${type}(${query})`
}

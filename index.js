#! /usr/bin/env node

const debug = require('debug')
debug.enable('mmonitor:*')
const log = debug('mmonitor:main')
const http = require('http')
const serveStatic = require('serve-static')
const serve = serveStatic('web/dist', {'index': ['index.html']})
const finalhandler = require('finalhandler')
const db = require('./db')

const connections = []

const cache = {results: []}

main()

async function main () {
  const PORT = process.env.HTTP_PORT || 9000
  let [file] = process.argv.slice(2)
  if (!file) {
    log('please provide a valid monitors.js file path')
    process.exit(1)
  }

  const monitors = require(file)
  log(`start: ${new Date().toISOString()}`)
  log(`listening on: http://localhost:${PORT}`)

  http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Request-Method', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
    res.setHeader('Access-Control-Allow-Headers', '*')
    if (req.method === 'OPTIONS') {
      res.writeHead(200)
      res.end()
      return
    }

    if (req.headers.accept && req.headers.accept.indexOf('text/event-stream') >= 0) {
      handleSSE(req, res)
      sendSSE(JSON.stringify({results: cache.results}))
      return
    }

    serve(req, res, finalhandler(req, res))
  }).listen(PORT)

  cache.results = await db.run(monitors)
  sendSSE(JSON.stringify({results: cache.results}))

  setInterval(async () => {
    cache.results = await db.run(monitors)
    sendSSE(JSON.stringify({results: cache.results}))
  }, 10000)
}

function handleSSE (req, res) {
  log('handle sse')
  connections.push(res)
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })
}

function sendSSE (data) {
  log('send sse')
  connections.forEach(connection => {
    if (!connection) return
    const id = new Date().toISOString()
    log('send connection', id, data)
    connection.write('id: ' + id + '\n')
    connection.write('data: ' + data + '\n\n')
  })
}

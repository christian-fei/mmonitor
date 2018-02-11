#! /usr/bin/env node

const http = require('http')
const serveStatic = require('serve-static')
const serve = serveStatic('build', {'index': ['index.html']})
const finalhandler = require('finalhandler')
const db = require('./db')
const connections = []

const cache = {results: []}

main()

async function main () {
  console.log('MMONITOR START', new Date().toISOString())
  console.log('process.env.SSE_PORT || 4200', process.env.SSE_PORT || 4200)

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
  }).listen(process.env.SSE_PORT || 4200)

  cache.results = await db.run()
  sendSSE(JSON.stringify({results: cache.results}))

  setInterval(async () => {
    cache.results = await db.run()
    sendSSE(JSON.stringify({results: cache.results}))
  }, 10000)
}

function handleSSE (req, res) {
  connections.push(res)
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })
}

function sendSSE (data) {
  connections.forEach(connection => {
    if (!connection) return
    const id = new Date().toISOString()
    connection.write('id: ' + id + '\n')
    connection.write('data: ' + data + '\n\n')
  })
}

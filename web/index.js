var css = require('sheetify')
var choo = require('choo')
var sseStore = require('./stores/sse')

css('tachyons')

var app = choo()
app.use(require('choo-sse')('http://0.0.0.0:9000'))

if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}

app.use(sseStore)

app.route('/', require('./views/main'))
app.route('/*', require('./views/404'))

if (!module.parent) app.mount('body')
else module.exports = app

module.exports = sseStore

function sseStore (state, emitter) {
  state.results = {}

  emitter.on('sse:open', function () {
    console.log('sse:open')
  })
  emitter.on('sse:message', function (message) {
    console.log('sse:message')
    if (message && message.data) {
      const data = JSON.parse(message.data)
      if (data.results) {
        state.results = data.results
      }
    }
    emitter.emit(state.events.RENDER)
  })
}

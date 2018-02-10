var html = require('choo/html')
var jt = require('json-toy')

var TITLE = 'mmonitor'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  const resultsAsList = Object.keys(state.results).reduce((acc, key) => acc.concat([{monitor: key, result: state.results[key]}]), [])

  const treeString = jt.treeString(state.results)

  return html`
    <body class="code lh-copy">
      <main class="pa3 cf center">
        <section class="fl mw6 w-50-m w-third-l pa3">
          <ul>
            ${resultsAsList.map(r => html`
              <li>
                <h1>${r.monitor}</h1>
                <h1 style="font-size: 3em;">${r.result}</h1>
              </li>
            `)}
          </ul>
          <pre>
            ${treeString}
          </pre>
        </section>
      </main>
    </body>
  `
}

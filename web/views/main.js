var html = require('choo/html')
var css = require('sheetify')

var TITLE = 'mmonitor'

const monitorPrefix = css`
  @keyframes fade-out {
    from {
      border-color: #ccc;
    }
    to {
      border-color: #f1f1f1;
    }
  }
  :host {
    list-style-type: none;
    animation: fade-out 1s ease-out;
    border-left: 2em solid #f1f1f1;
  }
`

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  const resultsAsList = Object.keys(state.results).reduce((acc, key) => acc.concat([{monitor: key, result: state.results[key]}]), [])

  return html`
    <body class="avenir lh-copy">
      <main class="pa3 cf center">
        <section class="pa3">
          ${resultsAsList.length === 0 ? html`
            <h1>loading...</h1>
          ` : null}
          <ul class="flex flex-wrap">
            ${resultsAsList.map(r => html`
              <li class="${monitorPrefix} pl5 pr5 mb3">
                <h1 class="mb1" style="font-size: 2em;">${r.monitor}</h1>
                <h1 class="mb1" style="font-size: 6em;">${r.result}</h1>
                <i>Last updated ${new Date().toISOString()}</i>
              </li>
            `)}
          </ul>
        </section>
      </main>
    </body>
  `
}

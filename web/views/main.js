var html = require('choo/html')
var css = require('sheetify')

var TITLE = 'mmonitor'

const monitorPrefix = css`
  :host {
    list-style-type: none;
    /* border-bottom: 2em solid black; */
    margin-bottom: 3rem;
  }
  :host h1 {
    margin: 0;
    margin-bottom: 0.1rem;
  }
`

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  const resultsAsList = Object.keys(state.results).reduce((acc, key) => acc.concat([{monitor: key, result: state.results[key]}]), [])

  return html`
    <body class="avenir lh-copy">
      <main class="pa3 cf center">
        <section class="fl mw6 w-50-m w-third-l pa3">
          ${resultsAsList.length === 0 ? html`
            <h1>loading...</h1>
          ` : null}
          <ul>
            ${resultsAsList.map(r => html`
              <li class="${monitorPrefix}">
                <h1 style="font-size: 2em;">${r.monitor}</h1>
                <h1 style="font-size: 6em;">${r.result}</h1>
                <i>Last updated ${new Date().toISOString()}</i>
              </li>
            `)}
          </ul>
        </section>
      </main>
    </body>
  `
}

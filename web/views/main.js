var html = require('choo/html')
var css = require('sheetify')

var TITLE = 'mmonitor'

const blinkPrefix = css`
  @keyframes blink {
    from {
      background: #ffff3d;
    }
    to {
      background: inherit;
    }
  }
  :host {
    animation: blink 2s ease-out;
  }
`

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
  :host h1 {
    margin-top: 0;
    margin-bottom: 0;
  }
`

module.exports = view

let iter = 0
function view (state, emit) {
  iter++
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="avenir lh-copy">
      <main class="pa3 cf center">
        <section class="pa3">
          ${state.results.length === 0 ? html`
            <h1>loading...</h1>
          ` : null}
          <ul class="flex flex-wrap">
            ${state.results.map(r => html`
              <li class="${monitorPrefix} pl5 pr5 mb3">
                <h1 class="mb1" style="font-size: 2em;">${r.title || (r.collection + '.' + r.type + (r.query ? '(' + r.query + ')' : ''))}</h1>
                <h1 class="mb1" style="font-size: 5em;">
                ${Array.isArray(r.result) ? r.result.map(r => html`
                  <p>${Object.keys(r).reduce((acc, key) => `${acc} ${r[key]}`, '')}</p>
                `) : r.result}
                </h1>
                <i class="${iter % 2 === 0 ? blinkPrefix : null}">
                  Last updated ${new Date().toISOString()}
                </i>
              </li>
            `)}
          </ul>
        </section>
      </main>
    </body>
  `
}

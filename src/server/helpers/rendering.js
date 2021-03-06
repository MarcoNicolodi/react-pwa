const React = require('react')
const ReactDOMServer = require('react-dom/server')
const serialize = require('serialize-javascript')

const AppShell = require('../../app/AppShell')

function renderAppShell ({ store, history }) {
  const initialState = store.getState()
  const html = ReactDOMServer.renderToString(
    <AppShell store={store} history={history} />
  )

  return (`
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#ff6600">
        <link rel="stylesheet" href="/css/app-shell.css">
        <link rel="preload" href="/js/app-shell.js" as="script">
        <link rel="manifest" href="/manifest.json">
        <link rel="shortcut icon" href="/images/favicon.ico">
      </head>
      <body>
        <div id="app-root">${html}</div>
        <script>window.__INITIAL_STATE__= ${serialize(initialState)}</script>
        <script defer src="/js/app-shell.js"></script>
      </body>
    </html>
  `)
}

module.exports = {
  renderAppShell
}

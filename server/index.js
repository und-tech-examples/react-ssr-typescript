const express = require('express');
const fs = require('fs');
const path = require('path');
const { renderToString } = require('react-dom/server');
const fileBuild = './dist/server.js';
const fileBuildExist= path.resolve(__dirname, fileBuild);

if(!fs.existsSync(fileBuildExist)) {
  console.log('please run `npm run build:ssr');
  process.exit();
}

const app = express();
app.use(express.static('client/dist'));
app.get('/', (req, res) => {
  const { ssrApp, sheet, store } = require(fileBuild);
  const renderApp = renderToString(ssrApp);
  const style = sheet.getStyleTags();
  const html = renderMarkup(renderApp, style, store.getState());
  console.log('html', html);
  res
    .status(200)
    .send(html);
});
app.listen(3000);

function renderMarkup(html, styleTags, preloadedState) {
  return `<!DOCTYPE html>
  <html>
    <head>
      <title>Webpack SSR</title>
      <meta charset='utf-8' />
      ${styleTags}
    </head>
    <body>
      <div id='root'>${html}</div>
      <script>
        // WARNING: See the following for security issues around embedding JSON in HTML:
        // http://redux.js.org/recipes/ServerRendering.html#security-considerations
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
          /</g,
          '\\u003c'
        )}
      </script>
      <script src='bundle.js'></script>
    </body>
  </html>`;
}
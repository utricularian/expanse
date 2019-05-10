import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter, matchPath} from "react-router-dom";
import serialize from 'serialize-javascript';

import Routes from '../src/routes';
import App from '../src/App';
import Api from './v1/api';

const PORT = process.env.PORT || 3006;
const app = express();

const api = new Api();

app.use(express.static('./build'));

app.use('/api', api.createRouter());

app.get('/api/*', (req, res) => {
  res.status(404).send(`path, ${req.url}, not found`);
});


app.get('/*', (req, res) => {
  const currentRoute = Routes.find(route => matchPath(req.url, route)) || {};
  console.log("Wrong place?");
  let promise;

  if (currentRoute.loadData) {
    promise = currentRoute.loadData();
  }
  else {
    promise = Promise.resolve(null);
  }

  promise.then(data => {
    const context = { data: data };

    const app = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    );

    const indexFile = path.resolve('./build/index.html');
    fs.readFile(indexFile, 'utf8', (err, indexData) => {
      if (err) {
        console.error('Something went wrong:', err);
        return res.status(500).send(`Oops, better luck next time!\n${err}`);
      }

      if (context.status === 404) {
        res.status(404);
      }

      if (context.url) {
        return res.redirect(301, context.url);
      }

      return res.send(
        indexData
          .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
          .replace('</body>',
            `<script>window.__ROUTE_DATA__ = ${serialize(data)}</script></body>`
          )
      );
    });
  });
});

app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`);
});


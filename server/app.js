import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';

import Api from './v1/api';

const app = express();

const api = new Api();

app.use(express.static('./build'));

app.use('/api/v1', api.createRouter());

app.get('/api/*', (req, res) => {
  res.status(404).send(`path, ${req.url}, not found`);
});


app.get('/*', (req, res) => {
  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, indexData) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send(`Oops, better luck next time!\n${err}`);
    }

    return res.send(indexData.replace('<div id="root"></div>', `<div id="root"></div>`));
  });
});

export default app;

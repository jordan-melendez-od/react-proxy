require('dotenv').config();
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = 5000;
const cookie = fs.readFileSync('./cookie.txt', 'utf8');
const { safeParseResponse, isJSON } = require('./utils');

// Proxy URL (see .env file for included proxy urls)
const proxy = process.env.ENV_SQS;

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.get('/', (req, res) => {
  res.send('Welcome to your proxy.')
});

app.all('*', (req, res) => {
  const { headers, method, originalUrl, body } = req;
  const {
    ['content-type']: contentType,
    accept,
  } = headers;

  if (method === 'POST') {

    return fetch(`${proxy}${originalUrl}`, {
      method,
      headers: {
        'Content-Type': contentType,
        accept,
        cookie
      },
      body: isJSON(body) ? body : JSON.stringify(body)
    })
      .then(async response => {
        const result = await safeParseResponse(response);
        
        return result;
      })
      .then(data => {
        
        if (isJSON(data)) {
          res.json(data);
        } else {
          res.send(data);
        }

      })
      .catch(err => res.send(err.toString()));
  }

  if (method === 'GET') {
    return fetch(`${proxy}${originalUrl}`, {
      method,
      headers: {
        'Content-Type': contentType,
        accept,
        cookie
      }
    })
      .then(response => response.json())
      .then(data => res.json(data))
      .catch(err => res.send(err.toString()));
  }

});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
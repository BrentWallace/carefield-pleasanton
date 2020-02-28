const path = require('path');
const express = require('express');
const hbs = require('hbs');
const router = require('../routers/routes');
require('dotenv').config();

const app = express();

app.use(router);

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


const port = process.env.PORT;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on ${port}`);
});

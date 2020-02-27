const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Carefield Pleasanton');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on ${port}`);
});

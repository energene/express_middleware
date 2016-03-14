const express = require('express');
const app = express();
const path = require('path');
const jsonParser = require(path.join(__dirname, 'lib', 'json_parser'));

app.post('/', jsonParser, (req, res) => {
  res.json(req.body);
});
app.listen(3000, () => console.log('Server on 3000'));

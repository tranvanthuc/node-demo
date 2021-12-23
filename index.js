const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const PORT = process.env.PORT || 5000;
require('dotenv').config();
app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));
app.use(cors());
app.use(bodyparser.json());
const db = require('./db.js');

// api
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/posts', (req, res) => {
  db.get(db.READ, function (err, connection) {
    if (err) res.send('Database problem');

    connection.query('SELECT * FROM posts ORDER BY id asc', (err, rows) => {
      if (err) throw err;

      res.send(rows);
    });
  });
});

app.post('/posts', (req, res) => {
  db.get(db.WRITE, function (err, connection) {
    if (err) res.send('Database problem');

    let post = req.body;
    connection.query('INSERT INTO posts SET ?', post, (err, row) => {
      if (err) throw err;

      const data = { id: row.insertId };
      res.send(data);
    });
  });
});

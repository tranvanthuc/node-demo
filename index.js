const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const PORT = process.env.PORT || 5000;
require('dotenv').config();
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
});
app.use(cors());
app.use(bodyparser.json());
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.READ_DB_HOST,
  user: process.env.READ_DB_USER,
  password: process.env.READ_DB_PASSWORD,
  database: process.env.READ_DB_DATABASE
});

// api
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/check', (req, res) => {
  connection.connect(function(err) {
    if (err) {
      res.send(err);
    }
  
    res.send('Connected');
  });
});

app.get('/posts', (req, res) => {
  const connection = mysql.createConnection({
    host: process.env.READ_DB_HOST,
    user: process.env.READ_DB_USER,
    password: process.env.READ_DB_PASSWORD,
    database: process.env.READ_DB_DATABASE
  });

  connection.connect(function(err) {
    if (err) {
      res.send(err);
    }
  
    connection.query('SELECT * FROM posts ORDER BY id asc', (err, rows) => {
      if (err)  console.log(err);

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

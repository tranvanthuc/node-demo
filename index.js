const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const PORT = process.env.PORT || 5000;
require('dotenv').config()
app.use(cors());
app.use(bodyparser.json());

const mysql = require('mysql');
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

con.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

// api
app.get('/posts', (req, res) => {
  con.query('SELECT * FROM posts ORDER BY id asc', (err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
});

app.post('/posts', (req, res) => {
  let post = req.body;
  console.log(post);
  con.query('INSERT INTO posts SET ?', post, (err, row) => {
    if (err) throw err;

    const data = { id: row.insertId };
    res.send(data);
  });
});

app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));

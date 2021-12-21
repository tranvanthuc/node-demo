const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const data = [
  {
    id: 1,
    title: 'Post title 1',
  },
  {
    id: 2,
    title: 'Post title 2',
  },
  {
    id: 3,
    title: 'Post title 3',
  },
  {
    id: 4,
    title: 'Post title 4',
  },
  {
    id: 5,
    title: 'Post title 5',
  },
  {
    id: 6,
    title: 'Post title 6',
  },
];
app.get('/posts', cors(), (req, res) => res.send(data));
app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));

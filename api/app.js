require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../app', 'build')));

  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../app', 'build', 'index.html'));
  });
}

const routes = require('./routes');

app.use('/api', routes);

app.listen(process.env.PORT, () => {
  console.log(`✅ SERVER CREATED AT PORT : ${process.env.PORT}`);
});

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const routes = require('./routes');

app.use('/api', routes);

app.listen(process.env.PORT, () => {
  console.log(`✅ SERVER CREATED AT PORT : ${process.env.PORT}`);
});

const express = require('express');
const router = express.Router();

const { controller } = require('./controller');

router.get('/data', controller);

module.exports = router;

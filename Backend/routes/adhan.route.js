const express = require('express');
const router = express.Router();
const { FetchAdhanTime } = require('../controllers/adhan.controller.js');

router.get('/AdhanInMyCity/:city/:date', FetchAdhanTime);

module.exports = router;
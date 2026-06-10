const express = require('express');
const { getDashboardCounts } = require('../Controller/DashboardController');

const router = express.Router();

router.get('/count',getDashboardCounts);

module.exports = router;

const express = require('express');
const router = express.Router();
const romanController = require('../controllers/romanController');
const metricsController = require('../controllers/metricsController');

router.get('/romannumeral', romanController.convertToRoman);
router.post('/metrics/romannumeral', metricsController.collectMetrics);

module.exports = router;

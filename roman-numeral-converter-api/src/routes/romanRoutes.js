const express = require('express');
const router = express.Router();
const romanController = require('../controllers/romanController');
const metricsController = require('../controllers/metricsController');

router.get('/romannumeral', romanController.convertToRoman);

router.post('/metrics/romannumeral', metricsController.collectMetrics);

router.get('/metrics/romannumeral', metricsController.sendMetrics);

router.get('/metrics/romannumeral/alive', metricsController.isAlive);

module.exports = router;

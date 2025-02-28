const fs = require('fs');
const path = require('path');
const PrometheusService = require('./prometheusService');

// Define log file path
const logFilePath = path.join(__dirname, '../../logs/metrics.log');

class MetricsService {
    /**
     * Logs received metrics data into the appropriate log file and to the monitoring system.
     * @param {Object} metricsData - The performance metrics data to log.
     */
    static logMetrics(metricsData) {
        PrometheusService.logMetricsToPrometheus(metricsData);
        MetricsService.logMetricsToFile(metricsData);
    }

    static logMetricsToFile(metricsData) {
        const logEntry = `[${new Date().toISOString()}] Metrics Received: ${JSON.stringify(metricsData)}\n`;
        
        fs.appendFile(logFilePath, logEntry, (err) => {
            if (err) {
                console.error(`Error writing to log file (${logFilePath}):`, err);
            }
        });
    }
}

module.exports = MetricsService;

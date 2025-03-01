const ErrorUtil = require('../utils/errorUtil');
const MetricsService = require('../services/metricsService');
const { registry } = require('../utils/prometheus');

/**
 * Handles incoming performance metrics from clients and logs them.
 * @param {Object} req - Request object containing the metrics data.
 * @param {Object} res - Response object used to return responses.
 * @param {Function} next - Middleware function for error handling.
 * @returns {JSON} - JSON response indicating success or failure.
 */
exports.collectMetrics = (req, res, next) => {
    try {
        const metricsData = req.body;
        if (!metricsData || Object.keys(metricsData).length === 0) {
            return res.status(400).json(ErrorUtil.createErrorResponse(
                400,
                "Invalid metrics data received.",
                "INVALID_METRICS",
                "Ensure you are sending valid performance metrics data."
            ));
        }

        // Log metrics using the dedicated service
        MetricsService.logMetrics(metricsData);

        res.status(200).json({ message: "Metrics recorded successfully." });
    } catch (error) {
        console.error('Error collecting metrics:', error);
        next(error);
    }
};

/**
 * Returns all collected Prometheus metrics.
 * @param {Object} req - Request object containing the metrics data.
 * @param {Object} res - Response object used to return responses.
 * @param {Function} next - Middleware function for error handling.
 * @returns {String} - Plain text response containing Prometheus metrics.
 */
exports.sendMetrics = async (req, res, next) => {
    try {
        res.set('Content-Type', registry.contentType);

        // Collects all registered Prometheus metrics
        const metricsData = await registry.metrics();
        
        //Sends the collected metrics
        res.end(metricsData);
    } catch (error) {
        console.error('Error getting metrics:', error);
        next(error);
    }
};

/**
 * Provides a simple heartbeat endpoint in Prometheus compatible format.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object used to return health check status.
 * @returns {String} - Prometheus-formatted heartbeat metrics.
 */
exports.isAlive = (req, res) => {
    const metrics = `
        # HELP rnc_api_health_status Health status of Node.js backend
        # TYPE rnc_api_health_status gauge
        rnc_api_health_status 1`;

    res.set("Content-Type", "text/plain");
    res.status(200).send(metrics);
};
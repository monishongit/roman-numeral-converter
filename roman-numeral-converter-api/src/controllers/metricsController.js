const ErrorUtil = require('../utils/errorUtil');
const MetricsService = require('../services/metricsService');

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
        next(error);
    }
};
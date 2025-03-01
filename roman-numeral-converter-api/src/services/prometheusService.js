const { webVitalsGauge, themeChangeCounter } = require("../utils/prometheus");

class PrometheusService {
    /**
     * Logs metrics to the Prometheus monitoring system.
     * @param {Object} metricsData
     */
    static logMetricsToPrometheus(metricsData) {
        try {
            if (metricsData["type"] === "theme") {
                // Increment theme counter to be sent to Prometheus
                const theme = metricsData["message"].split(":")[1];
                themeChangeCounter.inc({ theme });
            } else {
                // Parse Web Vital metrics to be sent to Prometheus
                // Get metric key
                const metricName = metricsData["message"].split(":")[0];

                // Get metric value using regex to capture numbers
                const match = metricsData["message"].match(/[-+]?\d*\.?\d+/);

                // Convert string to float
                const metricValue = match ? parseFloat(match[0]) : 0;

                if (metricName && metricValue != null) {
                    // Set the metric in Prometheus
                    webVitalsGauge.set({ metric_name: metricName }, metricValue);
                }
            }
        } catch (error) {
            console.error("Error logging metric in Prometheus:", error.message);
        }
    }
}

module.exports = PrometheusService;

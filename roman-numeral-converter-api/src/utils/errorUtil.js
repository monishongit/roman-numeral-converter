class ErrorUtil {
    /**
     * Generates a structured error response.
     * @param {number} status - HTTP status code.
     * @param {string} message - Description of the error.
     * @param {string} code - Custom error code.
     * @param {string} resolution - Suggested resolution steps.
     * @returns {object} - JSON formatted error response.
     */
    static createErrorResponse(status, message, code, resolution) {
        return {
            status,
            error: {
                message,
                code,
                resolution
            }
        };
    }
}

module.exports = ErrorUtil;

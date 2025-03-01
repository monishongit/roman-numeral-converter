/**
 * Provides a simple heartbeat endpoint in Prometheus compatible format.
 * @returns {String} - Prometheus-formatted heartbeat metrics.
 */
export async function GET() {
    const metrics = `
        # HELP rnc_ui_health_status Health status of Next.js app
        # TYPE rnc_ui_health_status gauge
        rnc_ui_health_status 1`;

        return new Response(metrics, {
            status: 200,
            headers: { "Content-Type": "text/plain" },
        });
}
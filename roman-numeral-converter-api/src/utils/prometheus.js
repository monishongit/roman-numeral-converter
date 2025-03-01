const { collectDefaultMetrics, Registry, Gauge, Counter, Histogram} = require('prom-client');

// Create a registry to store metrics
const registry = new Registry();
collectDefaultMetrics({ register: registry });

// Create a Gauge metric to store Web Vitals
const webVitalsGauge = new Gauge({
  name: 'web_vitals',
  help: 'Web Vitals data (e.g., CLS, FID, LCP)',
  labelNames: ['metric_name'],
  registers: [registry],
});

// Create a counter to keep track of theme usage
const themeChangeCounter = new Counter({
  name: 'theme_changes_total',
  help: 'Count of theme changes (light/dark)',
  // Label for theme type
  labelNames: ['theme'],
  registers: [registry],
});

// Create a counter metric to track HTTP requests
const httpRequestCounter = new Counter({
    name: "http_requests_total",
    help: "Total number of HTTP requests received",
    labelNames: ["method", "route", "status"],
    registers: [registry], // Registering to the same registry
  });
  
  // Create a histogram to track request duration
  const httpRequestDuration = new Histogram({
    name: "http_request_duration_seconds",
    help: "Duration of HTTP requests in seconds",
    labelNames: ["method", "route", "status"],
    buckets: [0.0001, 0.0005, 0.001, 0.005, 0.01, 0.05, 0.1, 0.3, 0.5, 1], // Define buckets for request times
    registers: [registry] // Registering automatically
  });
  
  
  // Function to track requests
  const trackRequest = (method, route, status) => {
    httpRequestCounter.inc({ method, route, status });
  };
  
  module.exports = { webVitalsGauge, registry, themeChangeCounter, httpRequestCounter, httpRequestDuration, trackRequest};

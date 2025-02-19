import { onCLS, onFID, onLCP, onTTFB, onINP } from "web-vitals";
import axios from "axios";

// Get base URL for RNC (Roman Numeral Converter) API
const API_BASE_URL = process.env.NEXT_PUBLIC_RNC_API_BASE_URL

export function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    console.log("Web Vitals tracking initialized...");

    // Track Core Web Vitals
    onCLS((metric) => handleWebVitals(metric, onPerfEntry));
    onFID((metric) => handleWebVitals(metric, onPerfEntry));
    onLCP((metric) => handleWebVitals(metric, onPerfEntry));
    onTTFB((metric) => handleWebVitals(metric, onPerfEntry));
    onINP((metric) => handleWebVitals(metric, onPerfEntry));
  }
}

// Function to log Web Vitals and send to API
function handleWebVitals(metric, onPerfEntry) {
  if (!metric || !metric.name || metric.value === undefined) {
    console.error("Invalid Web Vitals metric:", metric);
    return;
  }

  console.log(`WebVitals: ${metric.name} - ${metric.value}`);

  // Send Web Vitals data to backend API for logging
  sendWebVitalsToAPI(metric);
}

// Function to send Web Vitals to API
async function sendWebVitalsToAPI(metric) {
  const requestBody = {
    type: "webvitals",
    message: `${metric.name}: ${metric.value}`,
  };

  try {
    const response = await axios.post(`${API_BASE_URL}/metrics/romannumeral`, 
      requestBody, 
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    console.log(`WebVitals logged: ${metric.name} - ${metric.value}`);
  } catch (error) {
    console.error("Failed to log Web Vitals:", error);
  }
}

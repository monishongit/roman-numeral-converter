const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const romanRoutes = require('./routes/romanRoutes');
const cors = require('cors');

const app = express();
const RNC_API_BASE_URL = process.env.RNC_API_BASE_URL || 'localhost';
const RNC_API_PORT = process.env.RNC_API_PORT || 8080;
const RNC_UI_BASE_URL = process.env.RNC_UI_BASE_URL || 'localhost';
const RNC_UI_PORT = process.env.RNC_UI_PORT || 3000;

// Create log streams for request and error logging
const logDir = path.join(__dirname, '../logs');

// Ensure the logs directory exists
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}
const accessLogStream = fs.createWriteStream(path.join(logDir, 'access.log'), { flags: 'a' });
const errorLogStream = fs.createWriteStream(path.join(logDir, 'error.log'), { flags: 'a' });

// Middleware: Logging HTTP requests using morgan
app.use(morgan('combined', { stream: accessLogStream }));

// Middleware: Parse incoming JSON payloads
app.use(express.json());

// Enable CORS only for the desired URL ie., front end react app
app.use(cors({
    // Allow requests from React frontend
    origin: `http://${RNC_UI_BASE_URL}:${RNC_UI_PORT}`,

    // Allowed HTTP methods
    methods: ['GET', 'POST'],
    
    // Allowed headers
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Register API routes for Roman numeral conversion
app.use('/', romanRoutes);

// Global Error Handler with Logging
app.use((err, req, res, next) => {
    // Format error log entry
    const errorLogEntry = `[${new Date().toISOString()}] Error: ${err.message} | URL: ${req.originalUrl} | Method: ${req.method} | IP: ${req.ip}\n`;
    fs.appendFile(errorLogStream.path, errorLogEntry, (logErr) => {
        if (logErr) {
            console.error("Error writing to error log file:", logErr);
        }
    });
    
    // Print error details to the console for debugging
    console.error("Error:", err.message);
    
    // Send error response to client with structured error details
    const internalServerError = 500;
    res.status(err.status || internalServerError).json({
        error: {
            message: "Internal Server Error",
            code: err.code || "SERVER_ERROR",
            resolution: "Try again later."
        }
    });
});

// Start the Express server on the defined port
app.listen(RNC_API_PORT, () => {
    console.log(`Server running at ${RNC_API_BASE_URL}:${RNC_API_PORT}`);
});

const request = require('supertest');
const express = require('express');
const fs = require('fs');
const path = require('path');
const romanRoutes = require('../src/routes/romanRoutes');

const app = express();
app.use(express.json());
app.use('/', romanRoutes);

describe('Roman Numeral API Tests', () => {
    
    const logFilePath = path.join(__dirname, '../logs/metrics.log');

    beforeEach(() => {
        if (fs.existsSync(logFilePath)) {
            fs.unlinkSync(logFilePath);
        }
    });

    afterAll(async () => {
        // Close the server properly after tests
        if (app.close) {
            await app.close();
        }
    });

    test('should log theme metrics data', async () => {
        const metricsData = { "type": "theme", "message": "User switched to: dark" };

        const response = await request(app)
            .post('/metrics/romannumeral')
            .send(metricsData)
            .set('Content-Type', 'application/json');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Metrics recorded successfully.');
    
            const logContents = fs.readFileSync(logFilePath, 'utf8');
            expect(logContents).toContain('Metrics Received:');
            expect(logContents).toContain(JSON.stringify(metricsData));
    });

    test('should log web-vitals metrics data', async () => {
        const metricsData = { "type": "webvitals", "message": "TTFB: 48.89" };

        const response = await request(app)
            .post('/metrics/romannumeral')
            .send(metricsData)
            .set('Content-Type', 'application/json');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Metrics recorded successfully.');
    
            const logContents = fs.readFileSync(logFilePath, 'utf8');
            expect(logContents).toContain('Metrics Received:');
            expect(logContents).toContain(JSON.stringify(metricsData));
    });

    test('should return 404 for invalid url', async () => {

        const response = await request(app)
            .post('/metrics/')
            .send({});

            expect(response.status).toBe(404);
    });
});
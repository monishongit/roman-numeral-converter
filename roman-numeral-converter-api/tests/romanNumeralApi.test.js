const request = require('supertest');
const express = require('express');
const romanRoutes = require('../src/routes/romanRoutes');

const app = express();
app.use('/', romanRoutes);

describe('Roman Numeral API Tests', () => {
    
    // Positive test cases
    test('should return I for input 1', async () => {
        const response = await request(app).get('/romannumeral?query=1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ input: '1', output: 'I' });
    });

    test('should return IV for input 4', async () => {
        const response = await request(app).get('/romannumeral?query=4');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ input: '4', output: 'IV' });
    });

    test('should return XL for input 40', async () => {
        const response = await request(app).get('/romannumeral?query=40');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ input: '40', output: 'XL' });
    });

    test('should return MMMCMXCIX for input 3999 (upper limit)', async () => {
        const response = await request(app).get('/romannumeral?query=3999');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ input: '3999', output: 'MMMCMXCIX' });
    });

    // Negative test cases
    test('should return error for input 0 (below lower limit)', async () => {
        const response = await request(app).get('/romannumeral?query=0');
        expect(response.status).toBe(400);
        expect(response.body.error.message).toBe("Number out of range. Please enter a number between 1 and 3999.");
    });

    test('should return error for non-numeric input "hello"', async () => {
        const response = await request(app).get('/romannumeral?query=hello');
        expect(response.status).toBe(400);
        expect(response.body.error.message).toBe("Invalid input. Please provide a valid integer (1-3999).");
    });

    test('should return error for special characters "!@#%"', async () => {
        const response = await request(app).get('/romannumeral?query=!@#%');
        expect(response.status).toBe(400);
        expect(response.body.error.message).toBe("Invalid input. Please provide a valid integer (1-3999).");
    });

    test('should return error for empty query', async () => {
        const response = await request(app).get('/romannumeral?query=');
        expect(response.status).toBe(400);
        expect(response.body.error.message).toBe("Invalid input. Please provide a valid integer (1-3999).");
    });

    test('should return error for missing query parameter', async () => {
        const response = await request(app).get('/romannumeral');
        expect(response.status).toBe(400);
        expect(response.body.error.message).toBe("Invalid input. Please provide a valid integer (1-3999).");
    });
});

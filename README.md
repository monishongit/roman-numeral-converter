# roman-numeral-converter

This project is to develop a web application to convert a number into its roman numeral representation.

## Overview

This project adopts a microservices-style architecture, decoupling the frontend and backend to enhance scalability, maintainability, and deployment flexibility. This separation facilitates parallel development, testing, and deployment. It also simplifies future expansion and optimizations, ensuring the system remains modular and adaptable.

This modular approach enables seamless upgrades or replacements of individual components without disrupting the overall system. For instance, the backend API can be extended to support additional numeral systems without requiring changes to the frontend.

Below is a high-level architectural diagram that illustrates how the different components interact:

```
+--------------------------+                        +---------------------------+
|   Frontend UI (React)    | <----REST API Call---> |   Backend API (Node.js)   |
|   - User Input           |                        |   - Convert Number        |
|   - Display Result       |                        |   - Collect Logs/Metrics  |
|   - Dark/Light Theme     |                        |                           |
+--------------------------+                        +---------------------------+
                                                                  |
                                                                  v
                                                         +--------------------+
                                                        |  Roman Numeral Logic |
                                                         +--------------------+
```

This project consists of two separate applications:

1. **Backend API (`roman-numeral-converter-api`)** - A Node.js-based REST API that converts numbers to Roman numerals.
2. **Frontend Application (`roman-numeral-converter-ui`)** - A Next.js-based React UI that interacts with the backend API.

Both applications work together to provide a user-friendly interface for Roman numeral conversion.

**PS**: For ease of readability, steps to execute both the applications are captured in this single readme document.

## Table of Contents
- Prerequisites
- Setup
  - Backend Setup
    - Environment Variables
    - Start the Backend Application
    - Testing
  - Frontend Setup
    - Environment Variables
    - Start the Frontend Application
    - Testing
- API Documentation
- Engineering and Testing Methodology
- Dependency Attribution
- Project Structure
- Troubleshooting & Common Issues
- References

## Prerequisites

Before running the applications, install the following on your system:

- **[Node.js](https://nodejs.org/)** (version 22+ recommended)

## Setup

Clone the repository and navigate to the directory:
```sh
git clone https://github.com/monishongit/roman-numeral-converter.git
cd roman-numeral-converter
```

### Backend Setup (`roman-numeral-converter-api`)

Navigate to the backend directory:
```sh
cd <base-dir>/roman-numeral-converter/roman-numeral-converter-api
```

#### Environment Variables
Create a `.env` file in under `roman-numeral-converter-api/`:
```sh
touch .env
```
and copy/paste the follow content into the .env file:
```ini
RNC_API_BASE_URL=localhost
RNC_API_PORT=8080
RNC_UI_BASE_URL=localhost
RNC_UI_PORT=3000
LOG_LEVEL=info
```
- RNC_API_* indicates the config for the backend API
- RNC_UI_* indicates the config for the frontend, used for CORS setup

#### Start the Backend Application
Install dependencies and start the server in development mode:
```sh
npm install
npm start
```
- The API will be available at `http://localhost:8080/romannumeral?query=10` or based on the environment config setup from prior step.
- Logs will be written to the `logs/` directory.

#### Testing
Run unit tests:
```sh
npm run test
```
Run unit tests with coverage report:
```sh
npm run test:coverage
```

### Frontend Setup (`roman-numeral-converter-ui`)

Navigate to the backend directory:
```sh
cd <base-dir>/roman-numeral-converter/roman-numeral-converter-ui
```

#### Environment Variables
Create a `.env` file in under `roman-numeral-converter-ui/`:
```sh
touch .env
```
and copy/paste the follow content into the .env file:
```ini
NEXT_PUBLIC_RNC_API_BASE_URL=http://localhost:8080
```
This config indicates where the backend is running.

#### Start the Frontend Application
Install dependencies and start the server:
```sh
npm install
npm run build
npm start
```
Application will be available at `http://localhost:3000`.

#### Testing
Run unit tests:
```sh
npm test
```
Run unit tests with coverage report:
```sh
npm run test:coverage
```
Run Selenium integration tests:
Ensure both the backend and front end servers are up and running before executing this selenium test
```sh
npm run test:selenium
```

## API Documentation
### Endpoint 1: Convert Number to Roman Numeral

**Endpoint**: GET /romannumeral?query=<number>

**Description**: Converts a given integer into its corresponding Roman numeral representation.

**Example URL**: http://localhost:8080/romannumeral?query=<number>

**Query Parameter**:
  Type: Integer
  Required: Yes
  Description: The integer to be converted to a roman numeral (Range: 1 - 3999).

**Example Request**:
```sh
curl -X GET "http://localhost:8080/romannumeral?query=10"
```
**Example 200 Response**:
```sh
{
  "input": "10",
  "output": "X"
}
```
**Example 400 Error Response**:
```sh
{
  "error": "Invalid input. Please provide a number between 1 and 3999."
}
```

### Endpoint 2: Track Metrics
**Endpoint**: POST /metrics/romannumeral

**Description**: Logs user interactions, including the theme mode preference (light/dark) and other relevant frontend metrics.

**Example URL**: http://localhost:8080/metrics/romannumeral

**Header Parameter**:
  Content-Type: application/json

**Body**:
  theme or web-vital json data

**Example Request**:
```sh
curl -X POST "http://localhost:8080/metrics/romannumeral" \
-H "Content-Type: application/json" \
-d '{"type":"theme","message":"User switched to: light"}'
```
**Example 200 Response**:
```sh
{
  "message": "Metrics recorded successfully"
}
```
**Example 400 Error Response**:
```sh
{
  "error": "Invalid metrics data received."
}
```

## Engineering and Testing Methodology
**Code Quality**
  - The project follows best practices, including modular architecture, separation of concerns, and clear documentation.

**Automation**
  - Unit tests validate core logic and functions
  - Integration tests ensure API and frontend interactions function as expected
  - Backend tests are located in roman-numeral-converter-api/tests/
  - Frontend tests are in roman-numeral-converter-ui/__tests__/
  - Code coverage reports are generated after tests and stored in the coverage/ directory.

**Error Handling**
  - API responds with structured error messages for invalid input.
  - The UI properly displays errors with user-friendly messages.

**Logging & Monitoring**
  - The backend logs are stored in roman-numeral-converter-api/logs/ directory, including:
    - logs/access.log - API request logs with timestamps and statuses.
    - logs/metrics.log - Web-vitals metrics and dark vs light theme usage logs.
    - logs/error.log - Captures errors and stack traces.

## Dependency Attribution
- Express.js: Provides simple yet robust framework for handling API requests.
- Next.js: Well known React framework for frontend development.
- Adobe React Spectrum: Used to help with smooth and consistent UI styling.
- ESLint: Used to help with code formatting.
- Jest/Supertest: Popular testing frameworks for mocks and unit tests.

## Project Structure

**Backend**
```
roman-numeral-converter-api/
│── src/
│   ├── controllers/  # API request handlers
│   ├── routes/       # Defines API endpoints
│   ├── services/     # Business logic (number-to-Roman conversion)
│   ├── utils/        # Helper functions
│   ├── index.js      # Entry point
│── tests/            # Unit & integration tests
│── logs/             # Log storage
│── package.json      # Dependencies & scripts
│── .env              # Environment variables
```
**Frontend**
```
roman-numeral-converter-ui/
│── src/
│   ├── app/          # Next.js pages
│   ├── components/   # Reusable UI components
│   ├── context/      # State management
│── __tests__/
│      ├── selenium/  # Integration tests
│      ├── unit/      # Unit tests
│── package.json      # Dependencies & scripts
│── .env              # Environment variables
```
 
## Troubleshooting
- File/Directory Permission Issues: If you encounter permission errors while setting up, see if ownership and permissions change is needed using `chmod` command
- Missing dependencies: If `npm install` fails, try removing `node_modules` and `package-lock.json`, then reinstall:
  ```sh
  rm -rf node_modules package-lock.json
  npm install
  ```
- Port conflicts: If the backend fails to start, check if some other service is using the same port 8080 or 3000. 

## References
- [Wikipedia - Roman Numerals](https://en.wikipedia.org/wiki/Roman_numerals)
- [RapidTables - Number to Roman Numerals Conversion](https://www.rapidtables.com/convert/number/how-number-to-roman-numerals.html)


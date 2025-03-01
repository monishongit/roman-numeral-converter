# Use a Node.js image
FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Install Selenium WebDriver and Chrome dependencies
RUN apk add --no-cache chromium chromium-chromedriver

# Set Chrome binary path for Selenium
ENV CHROME_BIN=/usr/bin/chromium-browser

# Run Selenium tests
CMD ["npm", "run", "test:selenium"]
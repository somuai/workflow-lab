# workflow-lab

Lightweight, dependency-free JavaScript micro-utilities library for testing and practicing GitHub Actions CI/CD workflows, issue resolution, branching, pull requests, and automated releases.

## Included Modules

- **slugify**: Normalizes strings to URL-friendly slugs with unicode transliteration.
- **logger**: Structured JSON telemetry logger with timestamping and log levels.

## Usage

```javascript
const { slugify, createLogger } = require('./src');

// Slugify string
const slug = slugify('Hello World: Next Generation API!');
console.log(slug); // "hello-world-next-generation-api"

// Structured Logging
const logger = createLogger({ service: 'auth-service' });
logger.info('User session initialized', { userId: 42 });
```

## Running Tests

```bash
npm test
```

# workflow-lab

Production-grade, dependency-free JavaScript micro-utilities library. Designed to test and exercise GitHub Actions CI/CD workflows, pull requests, automated versioned releases, and single-account repository lifecycle automation.

## Included Modules

- **slugify**: High-throughput URL slug generator with unicode normalisation and regex caching.
- **retry**: Asynchronous exponential backoff runner with randomized jitter and retry lifecycle hooks.
- **deepMerge**: Safe deep object merging with `WeakSet` circular reference protection.
- **logger**: Structured JSON telemetry logger with log levels and child logger creation.

## Quickstart

```javascript
const { slugify, retry, deepMerge, createLogger } = require('./src');

// Slugify with caching
const slug = slugify('GitHub Actions CI: Production Release v1.0.0');

// Exponential backoff
await retry(async (attempt) => {
  return await fetch('https://api.example.com/data');
}, { maxAttempts: 5, baseDelayMs: 100 });

// Safe deep merge
const merged = deepMerge({ a: 1, config: { timeout: 5000 } }, { config: { retries: 3 } });

// Structured logger
const logger = createLogger({ service: 'workflow-lab' });
logger.info('System operational', { version: '1.0.0' });
```

## Running Tests

```bash
npm test
```

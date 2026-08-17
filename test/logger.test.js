const test = require('node:test');
const assert = require('node:assert/strict');
const { createLogger, LEVELS } = require('../src/logger');

test('logger: formats payload with timestamp and level', () => {
  const logger = createLogger({ app: 'test-app' });
  const entry = logger.info('Test message', { eventId: 101 });
  assert.equal(entry.level, 'info');
  assert.equal(entry.message, 'Test message');
  assert.equal(entry.app, 'test-app');
  assert.equal(entry.eventId, 101);
  assert.ok(entry.timestamp);
});

test('logger: creates child logger with inherited metadata', () => {
  const rootLogger = createLogger({ env: 'production' });
  const child = rootLogger.child({ module: 'payment' });
  const entry = child.warn('Payment delayed', { latencyMs: 500 });
  assert.equal(entry.level, 'warn');
  assert.equal(entry.env, 'production');
  assert.equal(entry.module, 'payment');
  assert.equal(entry.latencyMs, 500);
});

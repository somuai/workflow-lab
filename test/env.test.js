const test = require('node:test');
const assert = require('node:assert/strict');
const { getEnv, requireEnv, parseEnvInt, parseEnvBool } = require('../src/env');

test('env: getEnv retrieves values and falls back gracefully', () => {
  process.env.TEST_EXISTING_KEY = 'valid_value';
  assert.equal(getEnv('TEST_EXISTING_KEY', 'default'), 'valid_value');
  assert.equal(getEnv('TEST_NON_EXISTENT_KEY', 'fallback_value'), 'fallback_value');
  delete process.env.TEST_EXISTING_KEY;
});

test('env: requireEnv throws on missing or empty key', () => {
  process.env.TEST_REQUIRED_KEY = 'secret123';
  assert.equal(requireEnv('TEST_REQUIRED_KEY'), 'secret123');

  assert.throws(() => requireEnv('TEST_MISSING_SECRET'), {
    message: 'Missing required environment variable: TEST_MISSING_SECRET',
  });
  delete process.env.TEST_REQUIRED_KEY;
});

test('env: parseEnvInt and parseEnvBool parse correctly', () => {
  process.env.TEST_PORT = '8080';
  process.env.TEST_DEBUG = 'true';
  process.env.TEST_DISABLED = '0';

  assert.equal(parseEnvInt('TEST_PORT', 3000), 8080);
  assert.equal(parseEnvInt('TEST_PORT_MISSING', 3000), 3000);

  assert.equal(parseEnvBool('TEST_DEBUG', false), true);
  assert.equal(parseEnvBool('TEST_DISABLED', true), false);

  delete process.env.TEST_PORT;
  delete process.env.TEST_DEBUG;
  delete process.env.TEST_DISABLED;
});

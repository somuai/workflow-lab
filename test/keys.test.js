const test = require('node:test');
const assert = require('node:assert/strict');
const { getDeepKeys } = require('../src/keys');

test('keys: getDeepKeys extracts dot-notated paths', () => {
  const data = {
    app: {
      server: {
        port: 8080,
        host: '127.0.0.1',
      },
      env: 'production',
    },
    version: 1,
  };

  const keys = getDeepKeys(data);
  assert.deepEqual(keys, [
    'app',
    'app.server',
    'app.server.port',
    'app.server.host',
    'app.env',
    'version',
  ]);
});

const test = require('node:test');
const assert = require('node:assert/strict');
const { formatBytes, formatDuration } = require('../src/format');

test('format: formatBytes formats sizes appropriately', () => {
  assert.equal(formatBytes(0), '0 Bytes');
  assert.equal(formatBytes(1024), '1 KB');
  assert.equal(formatBytes(1048576), '1 MB');
  assert.equal(formatBytes(1572864, 1), '1.5 MB');
});

test('format: formatDuration formats milliseconds appropriately', () => {
  assert.equal(formatDuration(450), '450ms');
  assert.equal(formatDuration(1500), '1.5s');
  assert.equal(formatDuration(75000), '1m 15s');
});

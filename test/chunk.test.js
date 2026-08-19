const test = require('node:test');
const assert = require('node:assert/strict');
const { chunkArray } = require('../src/chunk');

test('chunk: divides array into equal sized chunks', () => {
  const items = [1, 2, 3, 4, 5, 6];
  assert.deepEqual(chunkArray(items, 2), [[1, 2], [3, 4], [5, 6]]);
  assert.deepEqual(chunkArray(items, 4), [[1, 2, 3, 4], [5, 6]]);
});

test('chunk: handles empty array and invalid sizes', () => {
  assert.deepEqual(chunkArray([], 2), []);
  assert.deepEqual(chunkArray([1, 2], 0), []);
  assert.deepEqual(chunkArray(null, 2), []);
});

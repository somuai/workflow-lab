const test = require('node:test');
const assert = require('node:assert/strict');
const { generateId, generateUuid } = require('../src/id');

test('id: generateId produces custom length strings with prefix', () => {
  const id1 = generateId('user', 12);
  assert.ok(id1.startsWith('user_'));
  assert.equal(id1.length, 5 + 12);

  const id2 = generateId('', 8);
  assert.equal(id2.length, 8);
});

test('id: generateUuid produces standard RFC4122 UUID', () => {
  const uuid = generateUuid();
  assert.match(uuid, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
});

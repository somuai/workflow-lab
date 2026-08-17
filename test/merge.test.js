const test = require('node:test');
const assert = require('node:assert/strict');
const { deepMerge } = require('../src/merge');

test('deepMerge: merges nested objects without mutating source', () => {
  const target = { a: 1, b: { c: 2, d: 3 } };
  const source = { b: { d: 4, e: 5 }, f: 6 };
  const result = deepMerge(target, source);

  assert.deepEqual(result, {
    a: 1,
    b: { c: 2, d: 4, e: 5 },
    f: 6,
  });
  assert.equal(target.b.d, 3);
});

test('deepMerge: safely handles circular object references', () => {
  const target = { user: { name: 'Alice' } };
  const source = { user: { role: 'admin' } };
  source.self = source;

  const result = deepMerge(target, source);
  assert.equal(result.user.name, 'Alice');
  assert.equal(result.user.role, 'admin');
  assert.ok(result);
});

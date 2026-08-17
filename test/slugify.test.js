const test = require('node:test');
const assert = require('node:assert/strict');
const { slugify } = require('../src/slugify');

test('slugify: converts string to basic slug', () => {
  assert.equal(slugify('Hello World'), 'hello-world');
  assert.equal(slugify('Testing 1 2 3'), 'testing-1-2-3');
});

test('slugify: strips diacritics and accents', () => {
  assert.equal(slugify('Crème Brûlée'), 'creme-brulee');
  assert.equal(slugify('Café au Lait'), 'cafe-au-lait');
});

test('slugify: supports custom separator', () => {
  assert.equal(slugify('Hello World', { separator: '_' }), 'hello_world');
  assert.equal(slugify('Multiple words here', { separator: '.' }), 'multiple.words.here');
});

test('slugify: handles edge cases and invalid input', () => {
  assert.equal(slugify(null), '');
  assert.equal(slugify(undefined), '');
  assert.equal(slugify('   --- leading and trailing ---  '), 'leading-and-trailing');
  assert.equal(slugify('$$$ Special @ Characters !!!'), 'special-characters');
});

test('slugify: high throughput benchmark assertion', () => {
  const start = Date.now();
  for (let i = 0; i < 5000; i++) {
    slugify('Benchmark performance string execution testing with diacritics: Naïve Café #123');
  }
  const duration = Date.now() - start;
  assert.ok(duration < 500, `Expected 5000 slugifications in < 500ms, took ${duration}ms`);
});

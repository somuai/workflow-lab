const test = require('node:test');
const assert = require('node:assert/strict');
const { retry } = require('../src/retry');

test('retry: succeeds on first attempt without delay', async () => {
  let attempts = 0;
  const result = await retry(async (att) => {
    attempts = att;
    return 'success';
  });
  assert.equal(result, 'success');
  assert.equal(attempts, 1);
});

test('retry: retries on failure and eventually succeeds', async () => {
  let callCount = 0;
  const retryEvents = [];

  const result = await retry(
    async (attempt) => {
      callCount++;
      if (callCount < 3) {
        throw new Error(`Transient error on attempt ${attempt}`);
      }
      return 'recovered';
    },
    {
      maxAttempts: 4,
      baseDelayMs: 10,
      onRetry: (err, att, delay) => {
        retryEvents.push({ att, delay });
      },
    }
  );

  assert.equal(result, 'recovered');
  assert.equal(callCount, 3);
  assert.equal(retryEvents.length, 2);
});

test('retry: exhausts maximum attempts and throws error', async () => {
  let callCount = 0;
  await assert.rejects(
    async () => {
      await retry(
        async () => {
          callCount++;
          throw new Error('Persistent failure');
        },
        { maxAttempts: 3, baseDelayMs: 5 }
      );
    },
    {
      name: 'Error',
      message: 'Persistent failure',
    }
  );

  assert.equal(callCount, 3);
});

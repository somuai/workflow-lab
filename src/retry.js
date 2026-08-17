function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function retry(fn, options = {}) {
  const maxAttempts = Number.isInteger(options.maxAttempts) && options.maxAttempts > 0 ? options.maxAttempts : 3;
  const baseDelayMs = Number.isInteger(options.baseDelayMs) && options.baseDelayMs >= 0 ? options.baseDelayMs : 50;
  const maxDelayMs = Number.isInteger(options.maxDelayMs) && options.maxDelayMs >= 0 ? options.maxDelayMs : 1000;
  const factor = typeof options.factor === 'number' && options.factor >= 1 ? options.factor : 2;
  const jitter = options.jitter !== false;
  const onRetry = typeof options.onRetry === 'function' ? options.onRetry : null;

  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn(attempt);
    } catch (error) {
      lastError = error;

      if (attempt >= maxAttempts) {
        break;
      }

      let delay = Math.min(baseDelayMs * Math.pow(factor, attempt - 1), maxDelayMs);
      if (jitter) {
        delay = Math.floor(Math.random() * delay);
      }

      if (onRetry) {
        onRetry(error, attempt, delay);
      }

      await sleep(delay);
    }
  }

  throw lastError;
}

module.exports = { retry, sleep };

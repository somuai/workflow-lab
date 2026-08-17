function getEnv(name, fallback = '') {
  const val = process.env[name];
  return val !== undefined && val !== '' ? val : fallback;
}

function requireEnv(name) {
  const val = process.env[name];
  if (val === undefined || val === '') {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return val;
}

function parseEnvInt(name, fallback = 0) {
  const val = process.env[name];
  if (val === undefined || val === '') return fallback;
  const num = parseInt(val, 10);
  return Number.isNaN(num) ? fallback : num;
}

function parseEnvBool(name, fallback = false) {
  const val = process.env[name];
  if (val === undefined || val === '') return fallback;
  return !['0', 'false', 'no', 'off'].includes(val.trim().toLowerCase());
}

module.exports = {
  getEnv,
  requireEnv,
  parseEnvInt,
  parseEnvBool,
};

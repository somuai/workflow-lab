const crypto = require('crypto');

function generateId(prefix = '', length = 16) {
  const bytes = crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
  return prefix ? `${prefix}_${bytes}` : bytes;
}

function generateUuid() {
  return crypto.randomUUID();
}

module.exports = { generateId, generateUuid };

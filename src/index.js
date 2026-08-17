const { slugify } = require('./slugify');
const { createLogger, LEVELS } = require('./logger');
const { retry, sleep } = require('./retry');
const { deepMerge, isObject } = require('./merge');

module.exports = {
  slugify,
  createLogger,
  LEVELS,
  retry,
  sleep,
  deepMerge,
  isObject,
};

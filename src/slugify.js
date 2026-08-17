const DIACRITICS_REGEX = /[\u0300-\u036f]/g;
const NON_ALPHANUMERIC_REGEX = /[^a-zA-Z0-9\s-_]/g;
const WHITESPACE_UNDERSCORE_REGEX = /[\s-_]+/g;

const ESCAPE_REGEX_SPECIAL = /[.*+?^${}()|[\]\\]/g;
const REGEX_CACHE = new Map();

function escapeRegex(string) {
  return string.replace(ESCAPE_REGEX_SPECIAL, '\\$&');
}

function getTrimPattern(separator) {
  let pattern = REGEX_CACHE.get(separator);
  if (!pattern) {
    const escaped = escapeRegex(separator);
    pattern = new RegExp(`^${escaped}+|${escaped}+$`, 'g');
    if (REGEX_CACHE.size < 50) {
      REGEX_CACHE.set(separator, pattern);
    }
  }
  return pattern;
}

function slugify(input, options = {}) {
  if (typeof input !== 'string') {
    return '';
  }

  const separator = typeof options.separator === 'string' ? options.separator : '-';
  const lowercase = options.lowercase !== false;

  let str = input
    .normalize('NFKD')
    .replace(DIACRITICS_REGEX, '')
    .trim();

  if (lowercase) {
    str = str.toLowerCase();
  }

  str = str
    .replace(NON_ALPHANUMERIC_REGEX, '')
    .replace(WHITESPACE_UNDERSCORE_REGEX, separator)
    .replace(getTrimPattern(separator), '');

  return str;
}

module.exports = { slugify, escapeRegex };

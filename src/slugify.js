function slugify(input, options = {}) {
  if (typeof input !== 'string') {
    return '';
  }

  const separator = typeof options.separator === 'string' ? options.separator : '-';
  const lowercase = options.lowercase !== false;

  let str = input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  if (lowercase) {
    str = str.toLowerCase();
  }

  str = str
    .replace(/[^a-zA-Z0-9\s-_]/g, '')
    .replace(/[\s-_]+/g, separator)
    .replace(new RegExp(`^${escapeRegex(separator)}+|${escapeRegex(separator)}+$`, 'g'), '');

  return str;
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = { slugify };

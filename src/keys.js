function getDeepKeys(obj, prefix = '') {
  if (obj === null || typeof obj !== 'object') {
    return [];
  }

  let keys = [];
  for (const key of Object.keys(obj)) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    keys.push(fullPath);
    if (obj[key] !== null && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      keys = keys.concat(getDeepKeys(obj[key], fullPath));
    }
  }
  return keys;
}

module.exports = { getDeepKeys };

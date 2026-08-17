function isObject(item) {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
}

function deepMerge(target, source, visited = new WeakSet()) {
  if (!isObject(target) || !isObject(source)) {
    return source !== undefined ? source : target;
  }

  if (visited.has(source)) {
    return Object.assign({}, target);
  }
  visited.add(source);

  const output = Object.assign({}, target);

  for (const key of Object.keys(source)) {
    if (isObject(source[key])) {
      if (!(key in target) || !isObject(target[key])) {
        output[key] = Object.assign({}, source[key]);
      } else {
        output[key] = deepMerge(target[key], source[key], visited);
      }
    } else if (Array.isArray(source[key])) {
      output[key] = source[key].slice();
    } else {
      output[key] = source[key];
    }
  }

  return output;
}

module.exports = { deepMerge, isObject };

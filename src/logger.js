const LEVELS = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

function createLogger(defaultMeta = {}) {
  function log(level, message, meta = {}) {
    const payload = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...defaultMeta,
      ...meta,
    };
    const output = JSON.stringify(payload);
    if (level === 'error') {
      process.stderr.write(`${output}\n`);
    } else {
      process.stdout.write(`${output}\n`);
    }
    return payload;
  }

  return {
    debug: (msg, meta) => log('debug', msg, meta),
    info: (msg, meta) => log('info', msg, meta),
    warn: (msg, meta) => log('warn', msg, meta),
    error: (msg, meta) => log('error', msg, meta),
    child: (extraMeta) => createLogger({ ...defaultMeta, ...extraMeta }),
  };
}

module.exports = { createLogger, LEVELS };

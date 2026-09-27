// This small logger makes it obvious which service produced a log line.
function log(message, details = {}) {
  console.log(`[user-service] ${message}`, details);
}

module.exports = { log };

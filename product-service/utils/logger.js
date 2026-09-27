// This helper prefixes logs so multiple terminal windows are easier to read.
function log(message, details = {}) {
  console.log(`[product-service] ${message}`, details);
}

module.exports = { log };

// A service-specific logger makes service-to-service calls visible in the console.
function log(message, details = {}) {
  console.log(`[order-service] ${message}`, details);
}

module.exports = { log };

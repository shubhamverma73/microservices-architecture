// A tiny logger wrapper keeps log messages consistent across this service.
// Controllers call this when forwarding requests or handling gateway errors.
function log(message, details = {}) {
  console.log(`[gateway] ${message}`, details);
}

module.exports = { log };

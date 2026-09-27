const config = require("../config");
const { proxyRequest } = require("../services/proxy.service");

// This controller decides which microservice should receive the request.
// gateway.routes.js calls these functions after matching /api/... routes.
function forwardToUsers(req, res) {
  return proxyRequest(req, res, config.userServiceUrl, req.originalUrl.replace("/api", ""));
}

function forwardToProducts(req, res) {
  return proxyRequest(req, res, config.productServiceUrl, req.originalUrl.replace("/api", ""));
}

function forwardToOrders(req, res) {
  return proxyRequest(req, res, config.orderServiceUrl, req.originalUrl.replace("/api", ""));
}

module.exports = {
  forwardToUsers,
  forwardToProducts,
  forwardToOrders
};

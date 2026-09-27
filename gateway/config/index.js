// This file keeps environment variables in one place.
// app.js imports this file when it needs service URLs.
require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  userServiceUrl: process.env.USER_SERVICE_URL,
  productServiceUrl: process.env.PRODUCT_SERVICE_URL,
  orderServiceUrl: process.env.ORDER_SERVICE_URL
};

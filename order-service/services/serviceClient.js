const axios = require("axios");
const { log } = require("../utils/logger");

// This file contains outbound HTTP calls from Order Service.
// The order controller calls these functions before creating an order.
async function fetchUser(userId) {
  const url = `${process.env.USER_SERVICE_URL}/users/${userId}`;
  log("Calling User Service", { url });

  const response = await axios.get(url);
  return response.data.data;
}

async function fetchProduct(productId) {
  const url = `${process.env.PRODUCT_SERVICE_URL}/products/${productId}`;
  log("Calling Product Service", { url });

  const response = await axios.get(url);
  return response.data.data;
}

module.exports = {
  fetchUser,
  fetchProduct
};

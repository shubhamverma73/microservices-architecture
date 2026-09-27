const Order = require("../models/Order");
const { fetchUser, fetchProduct } = require("../services/serviceClient");

// POST /orders demonstrates synchronous service-to-service communication.
// The request reaches this file from order.routes.js after validation succeeds.
async function createOrder(req, res, next) {
  try {
    const { userId, productId, quantity } = req.body;

    // Step 1: Ask User Service if the user exists.
    // If User Service returns 404 or is down, Axios throws and no order is saved.
    await fetchUser(userId);

    // Step 2: Ask Product Service if the product exists and read its price.
    const product = await fetchProduct(productId);

    if (product.quantity < quantity) {
      // 409 means the request conflicts with current product stock.
      return res.status(409).json({ message: "Not enough product quantity available" });
    }

    // Step 3: Calculate total price inside Order Service.
    const totalPrice = product.price * quantity;

    // Step 4: Save only IDs, quantity, and totalPrice. No joins, no copied documents.
    const order = await Order.create({
      userId,
      productId,
      quantity,
      totalPrice
    });

    res.status(201).json({ message: "Order created", data: order });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: "User or product not found" });
    }

    next(error);
  }
}

async function getOrders(req, res, next) {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ message: "Orders fetched", data: orders });
  } catch (error) {
    next(error);
  }
}

async function getOrderById(req, res, next) {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order fetched", data: order });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createOrder,
  getOrders,
  getOrderById
};

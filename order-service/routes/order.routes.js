const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderById
} = require("../controllers/order.controller");
const { orderValidator } = require("../validators/order.validator");
const validateRequest = require("../middlewares/validation.middleware");

const router = express.Router();

// Order routes expose create and read operations for this learning project.
router.post("/", orderValidator, validateRequest, createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);

module.exports = router;

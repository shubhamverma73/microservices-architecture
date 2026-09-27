const { body } = require("express-validator");

// Order validation checks only what the client sends.
// The controller later asks other services whether those IDs really exist.
const orderValidator = [
  body("userId").notEmpty().withMessage("userId is required"),
  body("productId").notEmpty().withMessage("productId is required"),
  body("quantity").isInt({ gt: 0 }).withMessage("quantity must be greater than 0")
];

module.exports = { orderValidator };

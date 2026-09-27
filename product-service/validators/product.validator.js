const { body } = require("express-validator");

// These rules protect the Product Service from invalid product data.
// The route calls this before the controller tries to save anything.
const productValidator = [
  body("name").notEmpty().withMessage("name is required"),
  body("price").isFloat({ gt: 0 }).withMessage("price must be greater than 0"),
  body("quantity").isInt({ min: 0 }).withMessage("quantity must be 0 or more")
];

module.exports = { productValidator };

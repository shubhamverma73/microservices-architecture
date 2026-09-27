const { body } = require("express-validator");

// Validators run before the controller.
// If a request is invalid, validation.middleware.js returns 400 immediately.
const createUserValidator = [
  body("name").notEmpty().withMessage("name is required"),
  body("email").isEmail().withMessage("email must be valid"),
  body("phone").optional().isString().withMessage("phone must be text")
];

module.exports = { createUserValidator };

const { validationResult } = require("express-validator");

// Sends a 400 response when required order fields are missing or invalid.
function validateRequest(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array()
    });
  }

  next();
}

module.exports = validateRequest;

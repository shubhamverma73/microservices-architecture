const { validationResult } = require("express-validator");

// This middleware converts express-validator errors into one clear 400 response.
// 400 means the client sent data the service cannot accept.
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

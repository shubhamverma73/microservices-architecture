const { validationResult } = require("express-validator");

// Invalid request data stops here with HTTP 400.
// That keeps controllers focused on business logic.
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

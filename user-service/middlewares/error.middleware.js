// Centralized error handling keeps controller code small and consistent.
// Controllers call next(error), then Express sends the error here.
function errorMiddleware(error, req, res, next) {
  console.error("User Service error", error);

  if (error.code === 11000) {
    // 409 means there is a conflict with existing data, such as duplicate email.
    return res.status(409).json({ message: "User with this email already exists" });
  }

  if (error.name === "CastError") {
    // 400 means the client sent an ID that is not a valid MongoDB ObjectId.
    return res.status(400).json({ message: "Invalid user id format" });
  }

  res.status(error.statusCode || 500).json({
    // 500 means the server failed unexpectedly.
    message: error.message || "Internal server error"
  });
}

module.exports = errorMiddleware;

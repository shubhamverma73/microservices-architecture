// All thrown controller errors pass through this middleware.
function errorMiddleware(error, req, res, next) {
  console.error("Order Service error", error);

  if (error.name === "CastError") {
    // 400 means the client sent an ID that is not a valid MongoDB ObjectId.
    return res.status(400).json({ message: "Invalid order id format" });
  }

  res.status(error.statusCode || 500).json({
    message: error.message || "Internal server error"
  });
}

module.exports = errorMiddleware;

const mongoose = require("mongoose");

// Order Service has its own database connection.
// It stores order documents, not copied user or product documents.
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Order Service connected to MongoDB");
  } catch (error) {
    console.error("Order Service MongoDB connection failed", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;

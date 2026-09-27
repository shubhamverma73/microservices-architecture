const mongoose = require("mongoose");

// This database connection belongs only to Product Service.
// No other service should read or write this database directly.
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Product Service connected to MongoDB");
  } catch (error) {
    console.error("Product Service MongoDB connection failed", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;

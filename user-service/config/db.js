const mongoose = require("mongoose");

// This file owns the database connection for User Service only.
// server.js calls connectDB before starting the HTTP server.
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("User Service connected to MongoDB");
  } catch (error) {
    console.error("User Service MongoDB connection failed", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;

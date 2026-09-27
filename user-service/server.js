require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

// server.js starts this independent microservice.
// It connects to the User database before accepting requests.
const PORT = process.env.PORT || 3001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
  });
});

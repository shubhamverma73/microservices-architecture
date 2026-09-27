require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

// Product Service starts independently on its own port.
const PORT = process.env.PORT || 3002;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Product Service running on port ${PORT}`);
  });
});

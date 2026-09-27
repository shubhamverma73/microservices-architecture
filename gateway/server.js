const app = require("./app");
const config = require("./config");

// server.js is intentionally small.
// Its only job is to start the HTTP server for this independent app.
app.listen(config.port, () => {
  console.log(`API Gateway running on port ${config.port}`);
});

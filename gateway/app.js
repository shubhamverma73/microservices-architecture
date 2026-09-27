const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const gatewayRoutes = require("./routes/gateway.routes");
const { log } = require("./utils/logger");

// app.js builds the Express application.
// server.js imports this app and starts listening on a port.
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// This log shows every request as it enters the gateway before routing.
app.use((req, res, next) => {
  log("Incoming request", { method: req.method, path: req.originalUrl });
  next();
});

app.use("/api", gatewayRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API Gateway is running" });
});

module.exports = app;

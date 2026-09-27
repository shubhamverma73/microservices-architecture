const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const orderRoutes = require("./routes/order.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const { log } = require("./utils/logger");

// app.js builds the Order Service Express app.
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  log("Incoming request", { method: req.method, path: req.originalUrl });
  next();
});

app.use("/orders", orderRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Order Service is running" });
});

app.use(errorMiddleware);

module.exports = app;

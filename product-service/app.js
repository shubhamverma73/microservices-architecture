const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const productRoutes = require("./routes/product.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const { log } = require("./utils/logger");

// app.js wires middleware and routes for Product Service.
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  log("Incoming request", { method: req.method, path: req.originalUrl });
  next();
});

app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Product Service is running" });
});

app.use(errorMiddleware);

module.exports = app;

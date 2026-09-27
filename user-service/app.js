const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./routes/user.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const { log } = require("./utils/logger");

// app.js creates the Express app but does not start the server.
// This separation keeps app setup and server startup easy to understand.
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  log("Incoming request", { method: req.method, path: req.originalUrl });
  next();
});

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "User Service is running" });
});

app.use(errorMiddleware);

module.exports = app;

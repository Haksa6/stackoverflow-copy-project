const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const logger = require("./utils/logger");
const config = require("./utils/config");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

// Connect to mongodb
mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB", error.message);
  });
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

app.use(cors());
app.use(express.json());
// Set up the routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

module.exports = app;

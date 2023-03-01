const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 5000;
dotenv.config();
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

app.use(cors());
app.use(express.json());

// Connect to mongodb
const mongoDb = "mongodb://localhost:27017/postdb";
// Connect to mongodb
mongoose.set("strictQuery", false);
mongoose
  .connect(mongoDb, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB", error.message);
  });
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

// Set up the routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.listen(port, () => {
  console.log(`Server running on ${port} `);
});

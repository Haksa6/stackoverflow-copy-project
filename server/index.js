const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.log("error connection to MongoDB", error.message);
  });

app.listen(port, () => {
  console.log(`Server running on ${port} `);
});

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    // Removes the Bearer part from the beginning so it can be compared
    const token = req.header("Authorization").replace("Bearer ", "");
    // If token not found, send error message
    if (!token) {
      res.status(401).json({
        msg: "Token not found",
      });
    }

    // Authenticate the token
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    // Set the current user
    req.user = user;
    next();
  } catch (e) {
    res.status(401);
  }
};

module.exports = auth;

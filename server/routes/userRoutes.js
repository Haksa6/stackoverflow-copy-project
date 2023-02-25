const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if user exist
    let oldUser = await User.findOne({ username: username });
    if (oldUser) {
      return res.status(409).send("Username already in use.");
    }

    const user = await User.create({
      username,
      password,
    });
    console.log(user._id);
    // Create jwt token
    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.status(200).json(token);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username: username });
    //Check if user exits and check that password is correct
    if (!user) res.status(400).send("Invalid Credentials");
    if (await bcrypt.compare(password, user.password)) {
      // Create token
      const token = jwt.sign(
        { id: user._id, username },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );
      res.status(200).json(token);
    }
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/current", auth, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) res.status(400).send("Invalid token");
    res.json(user);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;

const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../utils/auth");
const { body, validationResult } = require("express-validator");

router.post(
  "/register",

  body("username")
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters long"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long")
    .matches(/\d/)
    .withMessage("Password must contain at least one number"),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const msg = errors.array()[0].msg;
        return res.status(400).send(msg);
      }
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
      // Create jwt token
      const token = jwt.sign(
        { _id: user._id, username: username },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );
      res.status(200).json(token);
    } catch (err) {
      console.error(err.message);
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username: username });
    //Check if user exits and check that password is correct
    if (!user) res.status(400).send("User not found!");
    if (await bcrypt.compare(password, user.password)) {
      // Create token
      const token = jwt.sign(
        {
          _id: user._id,
          username: username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );
      res.status(200).json(token);
    } else {
      res.status(400).send("Incorrect password!");
    }
  } catch (err) {
    console.error(err.message);
  }
});

//Get the current user
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

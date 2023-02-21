const router = require("express").Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/add", async (req, res) => {
  try {
    const { title, codeSnippet } = req.body;
    const post = await Post.create({
      title,
      codeSnippet,
    });
    res.status(201).json(post);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;

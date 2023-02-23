const router = require("express").Router();
const Post = require("../models/Post");

// GET request to get all the posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.error(err.message);
  }
});

// POST request to add a new post
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

// GET request for a single post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(201).json(post);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;

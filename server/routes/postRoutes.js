const router = require("express").Router();
const Post = require("../models/Post");
const auth = require("../middleware/auth");
const Comment = require("../models/Comment");

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
router.post("/add", auth, async (req, res) => {
  try {
    const post = await Post.create({
      user: req.user.id,
      title: req.body.title,
      codeSnippet: req.body.codeSnippet,
    });
    res.status(201).json(post);
  } catch (err) {
    console.error(err.message);
  }
});

// GET request for a single post by ID
router.get("/:id", async (req, res) => {
  try {
    // Adds the comments as well so there's no need to do separate call
    const post = await Post.findById(req.params.id)
      .populate("comments")
      .populate("user");
    if (!post) return res.status(404).json({ msg: "Post not found" });

    res.status(201).json(post);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/:id/comment", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    const comment = await Comment.create({
      user: req.user.id,
      post: req.params.id,
      text: req.body.text,
    });

    console.log(comment);
    // Add the new comment to the post
    post.comments.push(comment);
    await post.save();
    res.status(201).json(comment);
  } catch (err) {
    onsole.error(err.message);
  }
});

module.exports = router;

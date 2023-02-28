const router = require("express").Router();
const Post = require("../models/Post");
const auth = require("../middleware/auth");
const Comment = require("../models/Comment");
const User = require("../models/User");

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
      user: req.user._id,
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
      user: req.user.username,
      post: req.params.id,
      text: req.body.text,
    });

    console.log(post.comments);
    // Add the new comment to the post
    post.comments.push(comment);
    await post.save();
    res.status(201).json(comment);
  } catch (err) {
    onsole.error(err.message);
  }
});

router.put("/:id/vote", auth, async (req, res) => {
  const voteValue = req.body.voteValue;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    // Check if the user has already voted on this post
    const existingVote = post.votes.find(
      (vote) => vote.user && vote.user.equals(req.user._id)
    );
    if (existingVote) {
      // User has already voted, update their vote
      if (existingVote.value === voteValue) {
        // User is trying to vote the same as before, change the vote value to 0
        existingVote.value = 0;

        await post.save();
        console.log(post.votes);
        return res.json(post);
      } else {
        // User is changing their vote value
        existingVote.value = voteValue;
      }
    } else {
      // User hasn't voted, add a new vote
      post.votes.push({ user: req.user._id, value: voteValue });
    }

    console.log(post.votes);

    await post.save();
    return res.json(post);
  } catch (err) {
    console.error(err);
  }
});

//Voting route for the comments
router.put("/commentvote", auth, async (req, res) => {
  const voteValue = req.body.voteValue;
  const commentId = req.body.commentId;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ msg: "Comment not found" });

    // Check if the user has already voted on this post

    const existingVote = comment.votes.find(
      (vote) => vote.user && vote.user.equals(req.user._id)
    );
    if (existingVote) {
      // User has already voted, update their vote
      if (existingVote.value === voteValue) {
        // User is trying to vote the same as before, change the vote value to 0
        existingVote.value = 0;
        await comment.save();

        console.log(comment.votes);
        return res.json(comment);
      } else {
        // User is changing their vote value
        existingVote.value = voteValue;
      }
    } else {
      // User hasn't voted, add a new vote
      comment.votes.push({ user: req.user._id, value: voteValue });
    }

    console.log(comment.votes);
    await comment.save();
    return res.json(comment);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;

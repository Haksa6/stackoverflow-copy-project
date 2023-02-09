const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  codeSnippet: { type: String, required: true },
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  lastEdited: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Post", postSchema);

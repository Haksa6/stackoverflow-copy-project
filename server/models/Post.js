const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  codeSnippet: { type: String },
  votes: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      value: { type: Number, default: 0 },
    },
  ],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  created: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Post", postSchema);

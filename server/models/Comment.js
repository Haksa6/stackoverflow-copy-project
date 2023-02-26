const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { type: String },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  text: { type: String, required: true },
  votes: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      value: { type: Number, default: 0 },
    },
  ],
  created: { type: Date, default: Date.now() },
  edited: { type: Date },
});

module.exports = mongoose.model("Comment", commentSchema);

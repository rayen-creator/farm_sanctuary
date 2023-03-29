const mongoose = require("mongoose");
const topic = Object.freeze({
  farming: "farming",
  agriculture: "agriculture",
  ranching: "ranching",
});

const postSchema = new mongoose.Schema({
  title: String,
  text: Number,
  likes: Number,
  topic: {
    enum: topic,
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: Date,
  updatedAt: Date,
});

const Post = mongoose.model("Posts", postSchema);

module.exports = Post;

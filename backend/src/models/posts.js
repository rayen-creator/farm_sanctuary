const mongoose = require("mongoose");
const topic = Object.freeze({
  farming: "farming",
  agriculture: "agriculture",
  ranching: "ranching",
});

const postSchema = new mongoose.Schema({
  image: String,
  title: String,
  text: String,
  likes: Number,
  topic: {
    type: String,
    enum: topic,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Comment",
    },
  ],
  createdAt: Date,
  updatedAt: Date,
});

const Post = mongoose.model("Posts", postSchema);

module.exports = Post;

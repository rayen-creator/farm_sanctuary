const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Post",
  },
  createdAt: Date,
  updatedAt: Date,
});

const Comment = mongoose.model("Comments", commentSchema);

module.exports = Comment;

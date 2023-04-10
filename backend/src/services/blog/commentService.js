const Comment = require("../../models/comment");
const Post = require("../../models/posts");

async function addComment(input, postId, userId) {
  const post = await Post.findById(postId);
  if (post) {
    const comment = new Comment({
      content: input.content,
      createdAt: new Date(),
      user: userId,
      post: postId,
    });
    const newComment = await comment.save();
    await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: newComment._id } },
      { new: true }
    );
    return newComment; // or return newComment._id, or updated post, depending on what you want to return
  }
}

async function getAllcomment(postId) {
  return await Comment.find({ post: postId }).populate({
      path: "user",
      model: "Users",
    })
    .populate({
      path: "post",
      model: "Posts",
    });
}

async function getcommentById(id) {
  return await Comment.findById(id)
    .populate({
      path: "user",
      model: "Users",
    })
    .populate({
      path: "post",
      model: "Posts",
    });
}
async function updateComment(id, input) {
  const updatedComment = new Comment({
    content: input.content,
    updatedAt: new Date(),
  });
  await Comment.findByIdAndUpdate(id, updatedComment, { new: true });
  return updatedComment;
}

async function deleteComment(id) {
  const comment = await Comment.findById(id)
    .populate({
      path: "user",
      model: "Users",
    })
    .populate({
      path: "post",
      model: "Posts",
    });

  if (!comment) {
    return null;
  }
  return await comment.remove();
}

module.exports = {
  addComment,
  updateComment,
  deleteComment,
  getAllcomment,
  getcommentById,
};

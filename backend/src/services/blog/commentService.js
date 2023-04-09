const Comment = require("../../models/comment");

async function addComment(input) {
  const comment = new Comment({
    content: input.content,
    createdAt: new Date(),
  });
  return await comment.save(comment);
}

async function getAllcomment() {
  return await Comment.find()
    .populate({
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

const Post = require("../../models/posts");
const User = require("../../models/user");
const Comment = require("../../models/comment");
const uploadImage = require("../utils/imageUpload");

async function addPost(input, file) {
  const post = new Post({
    title: input.title,
    text: input.text,
    likes: 0,
    topic: input.topic,
    user: input.user,
    createdAt: new Date(),
  });
  if (file) {
    const fileLocation = await uploadImage(file);
    post.image = fileLocation;
  }
  return await post.save(post);
}
async function getAllpost() {
  return await Post.find()
    .populate({
      path: "user",
      model: "Users",
    })
    .populate({
      path: "comments",
      model: "Comments",
    });
}

async function getpostById(id) {
  return await Post.findById(id).populate({
    path: "user",
    model: "Users",
  });
}

async function getPostsByUser(userId) {
  return await Post.find({ user: userId })
    .populate({
      path: "user",
      model: "Users",
    })
    .populate({
      path: "comments",
      model: "Comments",
    });
}

async function likePost(userId, postId) {
  const post = await Post.findById(postId);
  const user = await User.findById(userId);
  if (post && !user.likedPost.includes(postId)) {
    console.log("userinluce", user.likedPost.includes(postId));
    const addLike = await Post.updateOne(
      { _id: postId },
      { $set: { likes: post.likes + 1 } }
    );
    const assignLikeToUser = await User.updateOne(
      { _id: userId },
      {
        $push: { likedPost: post._id },
      }
    );
    return post;
  }
}
async function dislikePost(userId, postId) {
  const post = await Post.findById(postId);
  const user = await User.findById(userId);
  if (post && user.likedPost.includes(postId)) {
    const addLike = await Post.updateOne(
      { _id: postId },
      { $set: { likes: post.likes - 1 } }
    );
    const assignLikeToUser = await User.updateOne(
      { _id: userId },
      {
        $pull: { likedPost: post._id },
      }
    );
    return post;
  }
}
async function modifyPost(id, input, file) {
  const updatedPost = {
    image: input.image,
    title: input.title,
    text: input.text,
    topic: input.topic,
    updatedAt: new Date(),
  };
  if (file) {
    const fileLocation = await uploadImage(file);
    updatedPost.image = fileLocation;
  }
  await Post.findByIdAndUpdate(id, updatedPost, { new: true });
  return updatedPost;
}

async function deletePost(id) {
  const post = await Post.findById(id)
    .populate({
      path: "user",
      model: "Users",
    })
    .populate({
      path: "comments",
      model: "Comments",
    });
  if (!post) {
    return null;
  }
  if (post.comments.length > 0) {
    // Delete all comments associated with the post
    for (const commentId of post.comments) {
      const deletedcomments = await Comment.findByIdAndDelete(commentId);
    }
  }

  await post.remove();
  return post;
}

module.exports = {
  addPost,
  modifyPost,
  deletePost,
  getAllpost,
  getpostById,
  getPostsByUser,
  likePost,
  dislikePost,
};

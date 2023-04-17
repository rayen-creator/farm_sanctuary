const Post = require("../../models/posts");
const User = require("../../models/user");
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
  return await Post.find().populate({
    path: "user",
    model: "Users",
  });
}

async function getpostById(id) {
  return await Post.findById(id).populate({
    path: "user",
    model: "Users",
  });
}

async function getPostsByUser(userId) {
  return await Post.find({ user: userId }).populate({
    path: "user",
    model: "Users",
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
    const assignLikeToUser = await User.updateOne({_id :userId}, {
      $push: { likedPost: post._id },
    });
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
    const assignLikeToUser = await User.updateOne({_id :userId}, {
      $pull:  { likedPost: post._id },
    });
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
  const post = await Post.findById(id).populate({
    path: "user",
    model: "Users",
  });
  if (!post) {
    return null;
  }
  return await post.remove();
}

module.exports = {
  addPost,
  modifyPost,
  deletePost,
  getAllpost,
  getpostById,
  getPostsByUser,
  likePost,
  dislikePost
};

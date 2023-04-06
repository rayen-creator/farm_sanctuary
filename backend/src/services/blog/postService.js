const Post = require("../../models/posts");

async function addPost(input) {
  const post = new Post({
    image: input.image,
    title: input.title,
    text: input.text,
    likes: 0,
    topic: input.topic,
    user: input.user,
    createdAt: new Date(),
  });
  return await post.save(post);
}
async function modifyPost(id, input, file) {
  const updatedPost = {
    image: input.image,
    title: input.title,
    text: input.text,
    topic: input.topic,
    updatedAt: new Date(),
  };
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
  deletePost
};

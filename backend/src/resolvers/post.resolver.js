const postService = require("../services/blog/postService");

const postResolver = {
  Query: {
    async getAllPost() {
      try {
        return await postService.getAllpost();
      } catch (error) {
        throw Error(error);
      }
    },
    async getpostById(_, { id }) {
      try {
        return await postService.getpostById(id);
      } catch (error) {
        throw Error(error);
      }
    },
    async getPostsByUser(_, { userId }) {
      try {
        return await postService.getPostsByUser(userId);
      } catch (error) {
        throw Error(error);
      }
    },
  },
  Mutation: {
    async addPost(_, { input, file }) {
      try {
        return await postService.addPost(input, file);
      } catch (error) {
        throw new Error(error);
      }
    },
    async modifyPost(_, { id, input ,file }) {
      try {
        return await postService.modifyPost(id, input,file);
      } catch (error) {
        throw new Error(error);
      }
    },
    async likePost(_, { userId, postId }) {
      try {
        return await postService.likePost(userId, postId);
      } catch (error) {
        throw new Error(error);
      }
    },

    async dislikePost(_, { userId, postId }) {
      try {
        return await postService.dislikePost(userId, postId);
      } catch (error) {
        throw new Error(error);
      }
    },
    async deletePost(_, { id }) {
      try {
        return await postService.deletePost(id);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

module.exports = postResolver;

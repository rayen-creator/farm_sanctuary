const postService = require("../services/blog/postService");

const postResolver = {
  Query: {},
  Mutation: {
    async addPost(_, { input }) {
      try {
        return await postService.addPost(input);
      } catch (error) {
        throw new Error(error);
      }
    },
    async modifyPost(_, { id, input }) {
      try {
        return await postService.modifyPost(id, input);
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

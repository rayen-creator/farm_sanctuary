const commentService = require("../services/blog/commentService");

const commentResolver = {
  Query: {
    async getAllComment() {
      try {
        return await commentService.getAllcomment();
      } catch (error) {
        throw Error(error);
      }
    },
    async getCommentById(_, { id }) {
      try {
        return await commentService.getcommentById(id);
      } catch (error) {
        throw Error(error);
      }
    },
  },
  Mutation: {
    async addComment(_, { input }) {
      try {
        return await commentService.addComment(input);
      } catch (error) {
        throw Error(error);
      }
    },
    async modifyComment(_, { id, input }) {
      try {
        return await commentService.updateComment(id, input);
      } catch (error) {
        throw Error(error);
      }
    },
    async deleteComment(_, { id }) {
      try {
        return await commentService.deleteComment(id);
      } catch (error) {
        throw Error(error);
      }
    },
  },
};

module.exports = commentResolver;

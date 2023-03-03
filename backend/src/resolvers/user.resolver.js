const { UserInputError } = require('apollo-server-express');
const userService = require('../services/user');

const userResolver = {
  DateTime: require('graphql-iso-date').GraphQLDateTime,

  Query: {
    async getUser(_, { id }) {
      try {
        const user = await userService.getUser(id);
        if (!user) {
          throw new UserInputError('User not found');
        }
        return user;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    async getUsers() {
      try {
        return await userService.getUsers();
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },

  Mutation: {
    async createUser(_, { input }) {
      try {
        return await userService.createUser(input);
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    async updateUser(_, { id, input }) {
      try {
        const user = await userService.updateUser(id, input);
        if (!user) {
          throw new UserInputError('User not found');
        }
        return user;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    async deleteUser(_, { id }) {
      try {
        const user = await userService.deleteUser(id);
        if (!user) {
          throw new UserInputError('User not found');
        }
        return user;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
};

module.exports = userResolver;
const { UserInputError } = require("apollo-server-express");
const userService = require("../services/user");
const path = require('path')
const fs = require('fs')
const authService = require("../services/auth");

const userResolver = {
  DateTime: require("graphql-iso-date").GraphQLDateTime,

  Query: {
    async getUser(_, { id }) {
      try {
        const user = await userService.getUser(id);
        if (!user) {
          throw new UserInputError("User not found");
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
    async updateUser(parent, { id, input, file }) {
      try {
        const user = await userService.updateUser(id, input, file);
        if (!user) {
          throw new UserInputError("User not found");
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
          throw new UserInputError("User not found");
        }
        return user;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    toggleBlockUser: async (_, { id }) => {
      try {
        const user = await userService.toggleBlockUser(id);
        if (!user) {
          throw new UserInputError("User not found");
        }
        return user;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    async sendOTPVerificationSms(_, { input }) {
      return await userService.sendOTPVerificationSms(input);
    },
    async verifyEmailChangeOTP(_, { input }) {
      try {
        return await userService.verifyEmailChangeOTP(input);
      } catch (error) {
        console.log("moshkla");
        throw new Error(error);
      }
    },
    async updateEmail(_, { input }) {
      try {
        return await userService.updateEmail(input);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

module.exports = userResolver;

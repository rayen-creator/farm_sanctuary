const { UserInputError } = require("apollo-server-express");
const authService = require("../services/auth");

const authResolver = {
  DateTime: require("graphql-iso-date").GraphQLDateTime,

  Query: {},

  Mutation: {
    async signup(_, { input }) {
      try {
        return await authService.signup(input);
      } catch (error) {
        console.error(err);
        throw new Error("Failed to create user");      }
    },

    async signin(_, { input }) {
      try {
        return await authService.signin(input);
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
};

module.exports = authResolver;

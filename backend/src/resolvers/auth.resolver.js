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
        console.log(error);
        throw new Error(error);
      }
    },

    async signin(_, { input }) {
      try {
        return await authService.signin(input);
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    async sendmail(_, { input }) {
      return await authService.sendTokenlink(input);
    },
    async resetpwd(_, { input }) {
      try {
        return await authService.updatepwd(input);
      } catch (error) {
        throw new Error(error);
      }
    },
    async checkresettoken(_,{input}){
      try {
        return await authService.checkresettoken(input);
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    }
  },
};

module.exports = authResolver;

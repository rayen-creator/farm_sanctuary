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
    async resetpwd(_, { input }) {
      return await authService.restpwd(input);


    },



    async sendOTPVerificationEmail(_, { input }) {
      return await authService.sendOTPVerificationEmail(input);


    },  
    async verifyOTP (_, {input}) {

      try {
        return await authService.verifyOTP(input);
      } catch (error) {
        console.log("moshkla");
        throw new Error(error);
      }
    }
  },
};

module.exports = authResolver;

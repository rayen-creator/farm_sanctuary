const { UserInputError } = require('apollo-server-express');

const FarmProductService = require('../services/FarmProduct');


const FarmproductResolver = {
  DateTime: require("graphql-iso-date").GraphQLDateTime,
  Query: {
      async getFarmProducts() {
          try {
              return await FarmProductService.getFarmProducts();
          } catch (error) {
              throw new UserInputError(error.message);
          }
      },
  },
  Mutation: {
    async createFarmProd(_, { input, file }) {
      try {
          return await FarmProductService.createFarmProd(input, file);
      } catch (error) {
          throw new UserInputError(error.message);
      }
  },

  }
};

module.exports = FarmproductResolver











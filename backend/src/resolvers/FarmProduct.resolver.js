const { UserInputError } = require('apollo-server-express');

const FarmProductService = require('../services/FarmProduct');


const  createFarmProd = async (_, { input }) => {
  try {
    return await FarmProductService.createFarmProd(input);
  } catch (error) {
    throw new UserInputError(error.message);
  }
};





module.exports = {
  Mutation: {
    createFarmProd
  }
};




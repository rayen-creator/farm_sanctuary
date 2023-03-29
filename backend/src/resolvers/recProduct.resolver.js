const { UserInputError } = require('apollo-server-express');

const productDataService = require('../services/recProduct');

const getRecommendedProductById = async (parent, args, context, info) => {
  const { asin } = args;
  const productData = await productDataService.getProductData(asin);
  return {
    asin,
    title: productData.title,
    imageUrl: productData.imageUrl,
    price: productData.price,
    rating: productData.rating,
  };
  
};

const  createFarmProd = async (_, { input }) => {
  try {
    return await productDataService.createFarmProd(input);
  } catch (error) {
    throw new UserInputError(error.message);
  }
};





module.exports = {
  Query: {
    getRecommendedProductById,
  },
  Mutation: {
    createFarmProd
  }
  

};




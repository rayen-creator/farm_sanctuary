// const { UserInputError } = require('apollo-server-express');

const RecommendedProduct = require('../services/RecommendedProduct');

const getRecommendedProductById = async (parent, args, context, info) => {
  const { asin } = args;
  const productData = await RecommendedProduct.getRecommendedProductById(asin);
  return {
    asin,
    title: productData.title,
    imageUrl: productData.imageUrl,
    price: productData.price,
    rating: productData.rating,
  };
  
};





module.exports = {
  Query: {
    getRecommendedProductById,
  }
};




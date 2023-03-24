const RecommendedProductService = require("../services/recProduct");

const resolvers = {
    Query: {
      recommendedProducts: () => RecommendedProductService.getAll(),
      recommendedProduct: (_, { id }) => RecommendedProductService.getProductById(id),
    },
    Mutation: {
      addRecommendedProduct: (_, { name, price, imageURL, url, category }) => RecommendedProductService.add(name, price, imageURL, url, category),
      deleteRecommendedProduct: (_, { id }) => RecommendedProductService.delete(id),
      scrapeAndAddProduct: (_, { url }) => RecommendedProductService.scrapeAndAdd(url),
    },
  };
  
  module.exports = resolvers;
  
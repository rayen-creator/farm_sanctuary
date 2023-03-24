const { RecommendedProductService } = require("../services/recProduct");

const resolvers = {
    Query: {
      recommendedProducts: () => {
        return RecommendedProductService.getAll();
      },
      recommendedProduct: (_, { id }) => {
        return RecommendedProductService.getProductById(id);
      },
    },
    Mutation: {
      addRecommendedProduct: (_, { name, price, imageURL, url, category }) => {
        return RecommendedProductService.add(name, price, imageURL, url, category);
      },
      deleteRecommendedProduct: (_, { id }) => {
        return RecommendedProductService.delete(id);
      },
      scrapeAndAddRecommendedProduct: (_, { url }) => {
        return RecommendedProductService.scrapeAndAdd(url);
      },
    },
  };
  
  module.exports = resolvers;
  
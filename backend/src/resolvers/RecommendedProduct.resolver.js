const { UserInputError } = require('apollo-server-express');
const { fetchProducts, getRecommendedProducts, getRecommendedProductsByCategory } = require('../services/RecommendedProduct');

const recommendedproductresolvers = {
  Query: {
    products: async (_, { url }) => {
      const products = await fetchProducts(url);
      return products;
    },
  
  async getRecommendedProducts() {
    try {
        return await getRecommendedProducts();
    } catch (error) {
        throw new UserInputError(error.message);
    }
  },
  async getRecommendedProductsByCategory(_, { category }) {
    try {
        return await getRecommendedProductsByCategory(category);
    } catch (error) {
        throw new UserInputError(error.message);
    }
  },
},
};

module.exports = recommendedproductresolvers;

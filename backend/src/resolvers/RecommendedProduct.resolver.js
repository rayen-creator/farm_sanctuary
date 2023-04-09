const { fetchProducts, getRecommendedProducts } = require('../services/RecommendedProduct');

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
},
};

module.exports = recommendedproductresolvers;

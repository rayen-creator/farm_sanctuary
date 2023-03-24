const fetch = require('node-fetch');
const Product = require('./models/Product');

const resolvers = {
  Query: {
    product: async (_, { asin }) => {
      const product = await Product.findOne({ asin });
      if (!product) return null;

      // fetch recommended products data
      const response = await fetch(`https://example.com/api/recommendations/${asin}`);
      const recommendedProducts = await response.json();

      // add product URL to recommended products
      const productUrl = `https://example.com/products/${asin}`;
      const recommendedProductsWithUrl = recommendedProducts.map(p => ({ ...p, url: productUrl }));

      return { ...product.toObject(), recommendedProducts: recommendedProductsWithUrl };
    },
  },
};

module.exports = resolvers;

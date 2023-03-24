// RecommendedProduct service
const axios = require('axios');
const cheerio = require('cheerio');
const RecommendedProduct = require('../models/recProduct');

const RecommendedProductService = {
  getAll() {
    return RecommendedProduct.find();
  },

  getProductById(id) {
    return RecommendedProduct.findById(id);
  },

  add(input) {
    const { name, price, imageURL, url, category } = input;
    const product = new RecommendedProduct({
      name,
      price,
      imageURL,
      url,
      category
    });

    return product.save();
  },

  delete(id) {
    return RecommendedProduct.findByIdAndDelete(id);
  },

  scrapeAndAdd(url) {
    return axios.get(url)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const name = $('h1').text();
        const price = $('span.price').text();
        const imageURL = $('img.product-image').attr('src');

        return RecommendedProductService.add({ name, price, imageURL, url, category: 'Farm Supplies' });
      })
      .catch(error => console.log(error));
  }
};

module.exports = RecommendedProductService;

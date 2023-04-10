const axios = require("axios");
const cheerio = require("cheerio");
const RecommendedProduct = require("../models/RecommendedProduct");

const fetchProducts = async (url) => {
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);
  const products = [];

  $('.ty-column3').each((index, element) => {
    const priceText = $(element).find('.ty-price-num').last().text().trim();
    let price = null;
    if (priceText !== '') {
      price = parseFloat(priceText.replace('£', ''));
    }

    const image = $(element).find('.ty-pict').attr('src');
    const url = $(element).find('.ty-grid-list__image a').attr('href');
    const title = $(element).find('.product-title').text();
    const category = $('h1.ty-mainbox-title span').text();

    const product = new RecommendedProduct({
      title: title,
      price: price,
      image: image,
      category: category,
      url: url
    });
    products.push(product);
  });

  await RecommendedProduct.insertMany(products);

  return products;
};


async function getRecommendedProducts(){
  return RecommendedProduct.find();
}

async function getRecommendedProductsByCategory(category) {
  const query = { category };
  return RecommendedProduct.find(query);
}


module.exports = {
  fetchProducts,
  getRecommendedProducts,
  getRecommendedProductsByCategory
};

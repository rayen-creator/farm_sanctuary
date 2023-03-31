const axios = require("axios");
const cheerio = require("cheerio");


const getRecommendedProductById = async (asin) => {
  try {
    const response = await axios.get(`https://www.amazon.in/dp/${asin}/`);
    const $ = cheerio.load(response.data);
    const title = $("#productTitle").text().trim();
    const imageUrl = $('#landingImage').attr('src');
    const price = $('span.a-price-whole').text().substring(0,5);
    const rating = $('#acrCustomerReviewText').text().substring(0,13);
    const productUrl = response.config.url;

    return {
      asin,
      title,
      imageUrl,
      price,
      rating,
      productUrl
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  getRecommendedProductById  
};

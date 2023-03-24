const mongoose = require('mongoose');

const recommendedProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const RecommendedProduct = mongoose.model('RecommendedProduct', recommendedProductSchema);

module.exports = RecommendedProduct;

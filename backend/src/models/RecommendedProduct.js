const { Schema, model } = require('mongoose');

const recommendedProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  category:{
    type: String,
    required: true,
  }
});

const RecommendedProduct = model('RecommandedProduct', recommendedProductSchema);

module.exports = RecommendedProduct;


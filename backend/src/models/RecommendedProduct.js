const { Schema, model } = require('mongoose');

const recommendedProductSchema = new Schema({
  asin: { type: String, required: true, unique: true },
  title: String,
  price: String,
  imageUrl: String,
  url: String,
  ratingNumber:String
});

const RecommendedProduct = model('RecommandedProduct', recommendedProductSchema);

module.exports = RecommendedProduct;


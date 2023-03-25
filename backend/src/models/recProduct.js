const { Schema, model } = require('mongoose');

const recommendedProductSchema = new Schema({
  title: String,
  price: Number,
  image: String,
  url: String,
});

  const productReviewSchema = new Schema({
    author: String,
    rating: Number,
    text: String,
  });

const productSchema = new Schema({
  asin: { type: String, required: true, unique: true },
  title: String,
  price: Number,
  image: String,
  description: String,
  rating: Number,
  reviews: [productReviewSchema],
  recommendedProducts: [recommendedProductSchema],
});

const Product = model('Product', productSchema);

module.exports = Product;

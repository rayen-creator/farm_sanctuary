const { Schema, model } = require('mongoose');

const recommendedProductSchema = new Schema({
  asin: { type: String, required: true, unique: true },
  title: String,
  price: String,
  imageUrl: String,
  url: String,
  ratingNumber:String
});

 

const FarmProd = new Schema({
  title: String,
  price: Number,
  image: String,
  description: String,
  rating: Number,
  recommendedProducts: [recommendedProductSchema],
});

const Product = model('FarmProd', FarmProd);

module.exports = Product;

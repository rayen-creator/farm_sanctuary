const { Schema, model } = require('mongoose');

const recFarmProd = new Schema({
  asin: { type: String, required: true, unique: true },
  title: String,
  price: String,
  imageUrl: String,
  url: String,
  ratingNumber:String
});

 

const FarmProdSchema = new Schema({
  title: String,
  price: Number,
  image: String,
  description: String,
  rating: Number,
  recFarmProd: [recFarmProd],
});

const Product = model('Product', FarmProdSchema);

module.exports = Product;

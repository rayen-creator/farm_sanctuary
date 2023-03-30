const { Schema, model } = require('mongoose');


const FarmProductSchema = new Schema({
  title: String,
  price: String,
  image: String,
  description: String,
  rating: Number,
  //recommendedProducts: [recommendedProductSchema],
});

const FarmProduct = model('FarmProduct', FarmProductSchema);

module.exports = FarmProduct;

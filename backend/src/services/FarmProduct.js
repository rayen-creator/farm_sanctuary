const FarmProduct = require("../models/FarmProduct");

async function createFarmProd(input) {
  const farmproduct = new FarmProduct({
    title: input.title,
    price: input.price,
    image: input.image,
    description: input.description,
    rating: input.rating,
    
  });
  return await farmproduct.save(farmproduct);
}


module.exports = {
  createFarmProd
  
};

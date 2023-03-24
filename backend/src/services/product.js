const Product = require('../models/product');


async function getProduct(id) {
    return Product.findById(id).populate({path: "user", model: "Users"});
}

async function getProducts() {
    return Product.find().populate({path: "user", model: "Users"});
}

async function createProduct(input) {
    const product = new Product({
        name: input.name,
        description: input.description,
        price: input.price,
        quantity: input.quantity,
        location: {
            type: 'Point',
            coordinates: [input.location.longitude, input.location.latitude]
        },
        user: input.user,
        expirationDate: new Date(input.expirationDate),
        category: input.category,

    });
     await product.save(product);
    return {
        message: "product added !",
    };
}

async function updateProduct(id, input) {
    const updatedProduct = {
        name: input.name,
        description: input.description,
        price: input.price,
        quantity: input.quantity,
        location: {
            type: 'Point',
            coordinates: [input.location.longitude, input.location.latitude]
        },
        user: input.user,
        expirationDate: new Date(input.expirationDate),
        category: input.category,
        updatedAt: new Date(),
    };
     await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
    return {
        message: "product updated !",
    };
}

async function deleteProduct(id) {
    const product = await Product.findById(id);
    if (!product) {
        return null;
    }
    return await product.remove();
}

module.exports = {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};

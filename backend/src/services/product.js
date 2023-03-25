const Product = require('../models/product');
const User = require('../models/user');
const uploadImage = require("./utils/imageUpload");

async function getProduct(id) {
    return Product.findById(id).populate({path: "user", model: "Users"});
}

async function getProducts() {
    return Product.find().populate({path: "user", model: "Users"});
}
async function getProductsByUser(userId) {
    const products = await Product.find({ user: userId }).populate({path: "user", model: "Users"});
    return products;
}

async function createProduct(input, file) {
    const product = new Product({
        name: input.name,
        description: input.description,
        price: input.price,
        quantity: input.quantity,
        unit: input.unit,
        user: input.user,
        expirationDate: new Date(input.expirationDate),
        category: input.category,

    });
    const prodUser = await User.findById(input.user)
    product.country = prodUser.location;
    if (file) {
        const fileLocation = await uploadImage(file)
        product.image = fileLocation;
    }

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
        unit: input.unit,
        country: input.country,
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
    getProductsByUser
};

const Product = require('../models/product');
const User = require('../models/user');
const uploadImage = require("./utils/imageUpload");
const cron = require('node-cron');
const Notification = require("../models/notification"); // Import node-cron
async function getProduct(id) {
    return Product.findById(id).populate([{path: "user", model: "Users"},{
        path: 'reviews',
        populate: {
            path: 'userReview',
            model: 'Users'
        }
    }])
}

async function getProducts() {
    return Product.find().populate({path: "user", model: "Users"});
}
async function getProductsByUser(userId) {
    const products = await Product.find({ user: userId }).populate({path: "user", model: "Users"});
    return products;
}

async function getProductsByCategory(category) {
    const query = { category };
    return Product.find(query).populate({ path: "user", model: "Users" });
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
        expirationDiscount: input.expirationDiscount,

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

// Scheduled job to update product prices
cron.schedule('*/1 * * * *', async () => {
    const products = await Product.find();
    const currentDate = new Date();

    for (const product of products) {
        if (
            product.expirationDate &&
            (product.expirationDate - currentDate) <= 3 * 24 * 60 * 60 * 1000 &&
            product.inSale === false &&
            product.expirationDiscount === true
        ) {
            product.inSale = true;
            product.price = product.price * 0.5;
            await product.save();

            // Find the user associated with the product
            const user = await User.findById(product.user);

            // Create a notification for the user
            const notification = new Notification({
                content: `Your product ${product.name} is about to expire on ${product.expirationDate}. It has been put on sale at a 50% discount.`,
                recipient: "641b200da38bfe5417ef4c20",
                type: 'PRODUCT'
            });
            console.log(notification)
            await notification.save();

            // Add the notification to the user's notifications array
            user.notifications.push(notification._id);
            await user.save();
        }
    }

    // console.log('done job');
});


async function updateProduct(id, input, file) {
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
        expirationDiscount: input.expirationDiscount,
    };
    if (file) {
        const fileLocation = await uploadImage(file)
        updatedProduct.image = fileLocation;
    }
     await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
    return {
        message: "product updated !",
    };
}

async function deleteProduct(id) {
    const product = await Product.findById(id).populate({path: "user", model: "Users"});
    if (!product) {
        return null;
    }
    return await product.remove();
}

async function addReview(idProd, idUser, input) {
    const product = await Product.findById(idUser);

    if (!product) {
        return { message: "Product not found", reviewExist: false };
    }

    const existingReview = product.reviews.find((review) => review.userReview.toString() === idProd.toString());
    if (existingReview) {
        return { message: "User has already added a review for this product", reviewExist: true };
    }

    const review = {
        userReview: idProd,
        rating: input.rating,
        comment: input.comment,
        createdAt: new Date(),
    };

    product.reviews.push(review);
    product.rating.count += 1;
    product.rating.total += review.rating;
    product.rating.average = product.rating.total / product.rating.count;

    await product.save();

    return { message: "Review added successfully", reviewExist: false };
}




module.exports = {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByUser,
    addReview,
    getProductsByCategory
};

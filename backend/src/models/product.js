const mongoose = require('mongoose');
const productCategoryEnum = Object.freeze({
    FRUITS: 'FRUITS',
    VEGETABLES: 'VEGETABLES',
    DAIRY: 'DAIRY',
    MEAT: 'MEAT',
    GRAINS: 'GRAINS',
    NUTS: 'NUTS',
    HERBS: 'HERBS',
    SPICES: 'SPICES',
    HONEY: 'HONEY',
    MUSHROOMS: 'MUSHROOMS',
    OTHER: 'OTHER'
});

const unitEnum = Object.freeze({
    KG: 'KG',
    GRAM: 'GRAM',
    LITRE: 'LITRE',
    COUNT: 'COUNT'
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        index: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        enum: unitEnum,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    expirationDate: {
        type: Date,
        required: true
    },
    rating: {
        total: {
            type: Number,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        },
        average: {
            type: Number,
            default: 0
        }
    },
    reviews: [{
        userReview: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    category: {
        type: String,
        enum: productCategoryEnum,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        required: true
    },
});


const Product = mongoose.model('Products', productSchema);

module.exports = Product;

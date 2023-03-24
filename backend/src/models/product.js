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

const locationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
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
    location: {
        type: locationSchema,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
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
        userId: {
            type: mongoose.Schema.Types.ObjectId,
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
        required: false
    },
});


const Product = mongoose.model('Products', productSchema);

module.exports = Product;

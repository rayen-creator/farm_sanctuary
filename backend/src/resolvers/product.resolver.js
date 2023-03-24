const { UserInputError } = require('apollo-server-express');
const productService = require('../services/product');

const productResolver = {
    DateTime: require("graphql-iso-date").GraphQLDateTime,
    Query: {
        async getProduct(_, { id }) {
            try {
                const product = await productService.getProduct(id);
                if (!product) {
                    throw new UserInputError('Product not found');
                }
                return product;
            } catch (error) {
                throw new UserInputError(error.message);
            }
        },
        async getProducts() {
            try {
                return await productService.getProducts();
            } catch (error) {
                throw new UserInputError(error.message);
            }
        },
    },

    Mutation: {
        async createProduct(_, { input }) {
            try {
                return await productService.createProduct(input);
            } catch (error) {
                throw new UserInputError(error.message);
            }
        },
        async updateProduct(_, { id, input }) {
            try {
                const product = await productService.updateProduct(id, input);
                if (!product) {
                    throw new UserInputError('Product not found');
                }
                return product;
            } catch (error) {
                throw new UserInputError(error.message);
            }
        },
        async deleteProduct(_, { id }) {
            try {
                const product = await productService.deleteProduct(id);
                if (!product) {
                    throw new UserInputError('Product not found');
                }
                return product;
            } catch (error) {
                throw new UserInputError(error.message);
            }
        },
    },
};

module.exports = productResolver;

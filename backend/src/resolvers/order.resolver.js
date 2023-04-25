const { UserInputError } = require("apollo-server-express");

const orderService = require("../services/order");
const productService = require("../services/product");

const orderResolver = {
    Query: {
        async getOrder(_, { id }) {
            try {
                const order = await orderService.getOrder(id);
                if (!order) {
                    throw new UserInputError("Order not found");
                }
                return order;
            } catch (error) {
                throw new UserInputError(error.message);
            }
        },
        async getOrders() {
            try {
                return await orderService.getOrders();
            } catch (error) {
                throw new UserInputError(error.message);
            }
        },
        async getOrdersByUser(_, { userId }) {
            try {
                return await orderService.getOrdersByUser(userId);
            } catch (error) {
                throw error;
            }
        },
    },

    Mutation: {
        async createOrder(_, { input }) {
            try {
                return await orderService.createOrder(input);
            } catch (error) {
                throw new UserInputError(error.message);
            }
        },
        async updateOrderDeliveryStatus(_, { id, isDelivered }) {
            try {
                return await orderService.updateOrderDeliveryStatus(id, isDelivered);
            } catch (error) {
                throw new UserInputError(error.message);
            }
        },
        async deleteOrder(_, { id }) {
            try {
                const order = await orderService.deleteOrder(id);
                if (!order) {
                    throw new UserInputError('Order not found');
                }
                return order;
            } catch (error) {
                throw new UserInputError(error.message);
            }
        },
    },
};

module.exports = orderResolver;
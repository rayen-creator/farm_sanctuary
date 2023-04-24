const Order = require("../models/order");


async function getOrder(id) {
    return await Order.findById(id).populate({path: "user", model: "Users"});
}

async function getOrders() {
    return await Order.find().populate({path: "user", model: "Users"});
}

async function getOrdersByUser(userId) {
    return await Order.find({ user: userId }).populate({path: "user", model: "Users"});
}

async function createOrder(input) {
    const order = new Order({
        cartItems: input.cartItems,
        totalPrice: input.totalPrice,
        user: input.userId,
        isDelivered: false
    });
    return await order.save(order);

}

async function updateOrderDeliveryStatus(id, isDelivered) {
    const order = await Order.findById(id);
    order.isDelivered = isDelivered;
    return await order.save();
}
async function deleteOrder(id) {
    const order = await Order.findById(id).populate({path: "user", model: "Users"});
    if (!order) {
        return null;
    }
    return await order.remove();
}
module.exports = {
    getOrder,
    getOrders,
    getOrdersByUser,
    createOrder,
    updateOrderDeliveryStatus
};
const Order = require("../models/order");
const mapService = require("../services/map");

async function getOrder(id) {
  return await Order.findById(id).populate({ path: "user", model: "Users" });
}

async function getOrders() {
  return await Order.find().populate([
    { path: "user", model: "Users" },
    { path: "farmer", model: "Users" },
  ]);
}

async function getOrdersByUser(userId) {
  return await Order.find({ user: userId }).populate([
    { path: "user", model: "Users" },
    { path: "farmer", model: "Users" },
  ]);
}
async function getOrdersByFarmer(farmerId) {
  return await Order.find({ farmer: farmerId }).populate([
    { path: "user", model: "Users" },
    { path: "farmer", model: "Users" },
  ]);
}
async function createOrder(input) {
    console.log("input",input.location.city)
//   const newOrder = new Order(input);

//   await newOrder.save();

//   return {
//     message: "Order added!",
//   };
      const order = new Order({
          cartItems: input.cartItems,
          totalPrice: input.totalPrice,
          user: input.userId,
          farmer: input.farmerId,
          isDelivered: false,
          isConfirmed: false,
          location: {
              city: input.location.city,
              houseStreetnumber: input.location.houseStreetnumber,
              state: input.location.state,
              country: input.location.country,
              codePostal:input.location.codePostal,
          },
      });
  console.log("order",order)
      await order.save();
      
  return {
    message: "Order added!",
  };
}

async function updateOrderDeliveryStatus(id, isDelivered) {
  const order = await Order.findById(id);
  order.isDelivered = isDelivered;
  return await order.save();
}
async function updateOrderConfirmationStatus(id, isConfirmed) {
  const order = await Order.findById(id);
  order.isConfirmed = isConfirmed;
  return await order.save();
}
async function deleteOrder(id) {
  const order = await Order.findById(id).populate([
    { path: "user", model: "Users" },
    { path: "farmer", model: "Users" },
  ]);
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
  updateOrderDeliveryStatus,
  deleteOrder,
  updateOrderConfirmationStatus,
  getOrdersByFarmer,
};

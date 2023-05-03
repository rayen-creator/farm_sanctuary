const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  cartItems: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      total: { type: Number, required: true },
      image: { type: String, required: true },
      unit: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isDelivered: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isConfirmed: {
    type: Boolean,
    default: false,
  },
  location: {
    city: String,
    houseStreetnumber: String,
    state: String,
    country: String,
    codePostal: Number,
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;

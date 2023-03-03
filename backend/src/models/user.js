const mongoose = require("mongoose");
const roles = Object.freeze({
  FARMER: 'FARMER',
  CLIENT: 'CLIENT',
  ADMIN: 'ADMIN'
});
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  createdAt: Date,
  updatedAt: Date,
  isActive: Boolean,
  isBlocked: Boolean,
  role: {
    type: String,
    enum: roles,
  },
  image: {
    url: String,
    contentType: String
  }
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
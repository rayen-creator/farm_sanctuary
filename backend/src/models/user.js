const mongoose = require("mongoose");
const roles = ["farmer", "client", "admin"];
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
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
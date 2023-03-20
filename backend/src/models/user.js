const mongoose = require("mongoose");
const roles = Object.freeze({
  FARMER: "FARMER",
  CLIENT: "CLIENT",
  ADMIN: "ADMIN",
});

const gender = Object.freeze({
  MALE: "MALE",
  FEMALE: "FEMALE",
});
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true, // Create a unique index on the email attribute
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true, // Create a unique index on the email attribute
  },
  password: String,
  phone: Number,
  location:String,
  createdAt: Date,
  updatedAt: Date,
  isActive: Boolean,
  isBlocked: Boolean,
  gender: {
    type: String,
    enum: gender,
  },
  role: {
    type: String,
    enum: roles,
  },
  image: {
    url: String,
    contentType: String,
  },
  resetpwdToken: String,
  loginfailedAttempt: {
    count: Number,
    blocked:Boolean,
    lastAttempt: Date,
    backonlineat: Date,
  },
  two_FactAuth_Option: Boolean,
  two_FactAuth : { 
    code : String, 
    expiresAt: Date,

  }
});

const User = mongoose.model("Users", userSchema);

module.exports = User;

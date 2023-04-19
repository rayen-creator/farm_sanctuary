const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
  image: String,
  name: String,
  description:String,
  createdAt: Date,
  updatedAt: Date,
});

const Badge = mongoose.model("Badges", badgeSchema);

module.exports = Badge;

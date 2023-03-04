const mongoose = require("mongoose");

const deliveryAgentSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
    
    },
    latitude: {
      type: String,
    
    },

  },
  { timestamps: true }
);
const User = mongoose.model("deliveryAgents", deliveryAgentSchema);

module.exports = User;
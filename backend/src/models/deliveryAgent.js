const mongoose = require("mongoose");

const deliveryAgentSchema = new mongoose.Schema(
  {
    login: String,
    email: String,
    password: String,
    fullName: String,
    phone: Number,
    longitude: String,
    latitude: String,
    image: {
      url: String,
      contentType: String
    }
    
    

  },
  { timestamps: true }
);
const Agent = mongoose.model("deliveryAgents", deliveryAgentSchema);

module.exports = Agent;
const mongoose = require("mongoose");

const scenarioSchema = new mongoose.Schema({
  label: String,
  isActive: Boolean,
  description: String,
  scenarioEvents: 
  [{ 
    type: mongoose.Schema.Types.ObjectId,
     ref: "scenarioEvent" 
    }],
});

const Scenario = mongoose.model("Scenario", scenarioSchema);
module.exports = Scenario;

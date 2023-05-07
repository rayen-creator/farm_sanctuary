const mongoose = require("mongoose");



const scenarioSchema = new mongoose.Schema({
  label: String,
  isActive: Boolean,
  description:String,

});

const Scenario = mongoose.model('Scenarios', scenarioSchema);
module.exports = Scenario;

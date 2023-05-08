const mongoose = require("mongoose");
const Event = require("./event"); // import the event model
const eventType = Object.freeze({
  PLANTING: 'PLANTING',
  HARVESTING: 'HARVESTING',
  FERTILISER_APPLICATION: 'FERTILISER_APPLICATION',
  LIVESTOCK_CARE:'LIVESTOCK_CARE',
  PEST_CONTROL:'PEST_CONTROL',
  IRRIGATION:'IRRIGATION',
  CROP_ROTATION:'CROP_ROTATION'

});
const scenarioEventSchema = new mongoose.Schema({
  title: String,
  beforeDays: Number,
  afterDays:Number,
  order:Number,
  type: {
    type: String,
    enum:eventType,
  },
});

const ScenarioEvent=mongoose.model('ScenarioEvent', scenarioEventSchema);
module.exports=ScenarioEvent
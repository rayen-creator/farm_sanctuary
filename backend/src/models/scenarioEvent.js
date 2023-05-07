const mongoose = require("mongoose");
const scenarioEventType = Object.freeze({
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
  beforeDays: int,
  order:int, 
  AfterDays:int,
  duration:int,
  type: {
    type: String,
    enum:scenarioEventType,
  },
  scenario: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Scenario"
},

});

const Event = mongoose.model('scenarioEvents', scenarioEventSchema);
module.exports = Event;

const mongoose = require("mongoose");
const eventType = Object.freeze({
  PLANTING: 'PLANTING',
  HARVESTING: 'HARVESTING',
  FERTILISER_APPLICATION: 'FERTILISER_APPLICATION',
  LIVESTOCK_CARE:'LIVESTOCK_CARE',
  PEST_CONTROL:'PEST_CONTROL',
  IRRIGATION:'IRRIGATION',
  CROP_ROTATION:'CROP_ROTATION'
  
});

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  start:String, 
  end:String,
  type: {
    type: String,
    enum:eventType,
  }, 
  scenarioLabel:String,
  isAuto:Boolean,

});

const Event = mongoose.model('Events', eventSchema);
module.exports = Event;

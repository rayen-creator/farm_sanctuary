const mongoose = require("mongoose");
const eventType = Object.freeze({
  planting: 'planting',
  harvesting: 'harvesting',
  fertilizer_application: 'fertilizer_application',
  livestock_care:'livestock_care',
  Pest_Control:'Pest_Control',
  irrigation:'irrigation',
  crop_rotation:'crop_rotation'
  
});

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  start:String, 
  end:String,
  type: {
    type: String,
    enum:eventType,
  }

});

const Event = mongoose.model('Events', eventSchema);
module.exports = Event;

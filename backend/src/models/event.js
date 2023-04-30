const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
 
});

const Event = mongoose.model('Events', eventSchema);
module.exports = Event;

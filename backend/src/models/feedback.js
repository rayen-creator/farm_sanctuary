const mongoose = require("mongoose");
const category = Object.freeze({
  TECHNICAL: 'TECHNICAL',
  NON_TECHNICAL: 'NON_TECHNICAL',
  FUNCTIONAL: 'FUNCTIONAL'
  
});


const feedbackSchema = new mongoose.Schema({
      title: String,
      subject: String,
      content: String,
      rating: Number,
      category: {
        type: String,
        enum: category,
      }
  });
  
  const Feedback = mongoose.model("Feedback", feedbackSchema);
  
  module.exports = Feedback;
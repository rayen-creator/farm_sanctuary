const mongoose = require("mongoose");
const category = Object.freeze({
  TECHNICAL: 'TECHNICAL',
  NON_TECHNICAL: 'NON_TECHNICAL'
  
});
const rating = Object.freeze({
    GOOD: 'GOOD',
    AVERAGE: 'AVERAGE',
    BAD:'BAD'
    
  });

const feedbackSchema = new mongoose.Schema({
    title: String,
    subject: String,
    content: String,
    rating: {
        type:String,
        enum:rating,
    },
    category: {
      type: String,
      enum: category,
    }
    
  });
  
  const Feedback = mongoose.model("Feedback", feedbackSchema);
  
  module.exports = Feedback;
const Feedback = require("../models/feedback");

async function getFeedback(id) {
  return  Feedback.findById(id);
}

async function getFeedbacks() {
  return Feedback.find();
}

async function  getFiveStarFeedbacks() {
  return Feedback.find({ rating: 5 });
}



async function createFeedback(input) {
  const feedback = new Feedback({
    title: input.title,
    subject: input.subject,
    content: input.content,
    rating: input.rating,
    role: input.role,
    category:input.category,
    
  });
  return await feedback.save(feedback);
}








module.exports = {
  getFeedback,
  getFeedbacks,
  createFeedback,
 
  getFiveStarFeedbacks
};

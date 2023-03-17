const Feedback = require("../models/feedback");

async function getFeedback(id) {
  return  Feedback.findById(id);
}

async function getFeedbacks() {
  return Feedback.find();
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

async function updateFeedback(id, input) {
  const updatedFeedback = {
    title: input.title,
    subject: input.subject,
    content: input.content,
    rating: input.rating,
    role: input.role,
    category:input.category,
  };

  return await Feedback.findByIdAndUpdate(id, updatedFeedback, { new: true });
}

async function deleteFeedback(id) {
  const feedback = await Feedback.findById(id);
  if (!feedback) {
    return null;
  }
  return await feedback.remove();
}




module.exports = {
  getFeedback,
  getFeedbacks,
  createFeedback,
  updateFeedback,
  deleteFeedback,
  
};

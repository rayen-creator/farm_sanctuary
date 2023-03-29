const Feedback = require("../models/feedback");

async function getFeedback(id) {
  return  await Feedback.findById(id);
}

async function getFeedbacks() {
  return await Feedback.find();
}

async function getFeedbackPerUser(userId){
  return await Feedback.find({ user: userId }).populate({path: "user", model: "Users"});
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
    user: input.user,
    createdAt:new Date()

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





module.exports = {
  getFeedback,
  getFeedbacks,
  createFeedback,
  getFeedbackPerUser,
  getFiveStarFeedbacks
};

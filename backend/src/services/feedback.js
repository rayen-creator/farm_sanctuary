const Feedback = require("../models/feedback");

async function getFeedback(id) {
  return  await Feedback.findById(id);
}

async function getFeedbacks() {
  return await Feedback.find().populate({path: "user", model: "Users"});
}

async function getFeedbackPerUser(userId){
  return await Feedback.find({ user: userId }).populate({path: "user", model: "Users"});
}

async function  getFiveStarFeedbacks() {
  return await Feedback.find({ rating: 5 }).populate({path: "user", model: "Users"});
}


async function  getOneStarFeedbacks() {
  return Feedback.find({ rating: 1 });
}




async function createFeedback(input) {
  const feedback = new Feedback({
    title: input.title,
    subject: input.subject,
    content: input.content,
    rating: input.rating,    
    category:input.category,
    user: input.user,
    createdAt:new Date()

  });
  return await feedback.save(feedback);
}

async function deleteFeedback(id) {
  const feedback = await Feedback.findById({ _id: id });
  if (!feedback) {
      return null;
  }
  return await feedback.remove();
}






module.exports = {
  getFeedback,
  getFeedbacks,
  createFeedback,
  getFeedbackPerUser,
  getFiveStarFeedbacks, 
  getOneStarFeedbacks, 
  deleteFeedback
};

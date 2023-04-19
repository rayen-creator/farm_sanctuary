const { UserInputError } = require("apollo-server-express");

const feedbackService = require("../services/feedback");

const feedbackResolver = {
  Query: {
    async getFeedback(_, { id }) {
      try {
        const feedback = await feedbackService.getFeedback(id);
        if (!feedback) {
          throw new UserInputError("Feedback not found");
        }
        return feedback;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    async getFeedbacks() {
      try {
        return await feedbackService.getFeedbacks();
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    async getFeedbackPerUser(_ ,{userId}) {
      try {
        return await feedbackService.getFeedbackPerUser(userId);
      } catch (error) {
        throw error;
      }
    },
    async getFiveStarFeedbacks(){
      try{
        return await feedbackService.getFiveStarFeedbacks();
      }catch(error){
        throw new UserInputError(error.message);
      }
    },
    async getOneStarFeedbacks(){
      try{
        return await feedbackService.getOneStarFeedbacks();
      }catch(error){
        throw new UserInputError(error.message);
      }
    }

  },

  Mutation: {
    async createFeedback(_, { input }) {
      try {
        return await feedbackService.createFeedback(input);
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    async deleteFeedback(_, { id }) {
      try {
          const feedback = await feedbackService.deleteFeedback(id);
          if (!feedback) {
              throw new UserInputError('feedback not found');
          }
          return feedback
      } catch (error) {
          throw new UserInputError(error.message);
      }
  },
  },
};

module.exports = feedbackResolver;

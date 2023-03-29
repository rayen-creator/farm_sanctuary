const { UserInputError } = require('apollo-server-express');

const feedbackService = require('../services/feedback');

const feedbackResolver = {

  Query: {
    async getFeedback(_, { id }) {
      try {
        const feedback = await feedbackService.getFeedback(id);
        if (!feedback) {
          throw new UserInputError('Feedback not found');
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
    async getFiveStarFeedbacks(){
      try{
        return await feedbackService.getFiveStarFeedbacks();
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
    
    
  },
};

module.exports = feedbackResolver;
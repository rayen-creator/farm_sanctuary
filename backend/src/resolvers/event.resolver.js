const { UserInputError } = require("apollo-server-express");
const eventService = require("../services/event");

const eventResolver = {
  Query: {
    async getEvent(_, { id }) { 
      try {
        return await eventService.getEvent(id);
      } catch (error) {
        throw Error(error);
      }
    },
    async getEvents() {
      try {
        return await eventService.getEvents();
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
  Mutation: {
    async createEvent(_, { input }) {
      try {
        return await eventService.createEvent(input);
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    async updateEvent(_, { id, input }) {
      try {
        return await eventService.updateEvent(id, input);
      } catch (error) {
        throw new Error(error);
      }
    },
    async deleteEvent(_, { id }) {
      try {
        const event = await eventService.deleteEvent(id);
        if (!event) {
          throw new UserInputError('event not found');
        }
        return event;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
};

module.exports = eventResolver;

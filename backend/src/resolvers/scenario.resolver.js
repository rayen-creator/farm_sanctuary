const scenrioService = require("../services/scenario");

const scenarioResolvers = {
  Query: {

  },

  Mutation: {
    async createScenario(_, { input }) {
      try {
        return scenrioService.createScenario(input);
      } catch (err) {
        throw new Error(err);
      }
    },
    async createEventsFromScenario(_, { label }) {
      try {
        return await scenrioService.createEventsFromScenario(label);
      } catch (error) {
        throw new Error(error);
      }
    }
  },
};

module.exports = scenarioResolvers;

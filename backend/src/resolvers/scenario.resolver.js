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
    async createEventsFromScenario(_, { id }) {
      try {
        return await scenrioService.createEventsFromScenario(id);
      } catch (error) {
        throw Error(error);
      }
    },
  },
};

module.exports = scenarioResolvers;

const scenarioEventService=require("../services/scenarioEvent");
const productService = require("../services/product");
const {UserInputError} = require("apollo-server-express");
const resolvers = {
  Query: {
    // async scenarioEvents() {
    // },
    async scenarioEvent(_, {id}) {
      try{
        return await scenarioEventService.getScenarioEvents(id);
      }catch(error){
        throw Error(error);
      }
    },
  },
  Mutation: {
    // async createScenarioEvent(_, args) {
     
    // },
    async createScenarioEvent(_, { input}) {
      try {
        return await scenarioEventService.createscenarioEvent(input);
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    // async updateScenarioEvent(_, args) {
     
    // },
    // async deleteScenarioEvent(_, args) {
    // },
  },
};

module.exports = resolvers;

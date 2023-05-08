const scenarioEventService=require("../services/scenarioEvent");
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
    // async updateScenarioEvent(_, args) {
     
    // },
    // async deleteScenarioEvent(_, args) {
    // },
  },
};

module.exports = resolvers;

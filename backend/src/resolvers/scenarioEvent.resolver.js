const scenarioEvent = require("../models/scenarioEvent");

const resolvers = {
  Query: {
    async scenarioEvents() {
      return await scenarioEvent.find().populate("scenario");
    },
    async scenarioEvent(parent, args) {
      return await scenarioEvent.findById(args.id).populate("scenario");
    },
  },
  Mutation: {
    async createScenarioEvent(parent, args) {
      const { title, beforeDays, order, afterDays, duration, type, scenario } = args.input;
      const newScenarioEvent = new scenarioEvent({
        title,
        beforeDays,
        order,
        afterDays,
        duration,
        type,
        scenario,
      });
      await newScenarioEvent.save();
      return newScenarioEvent;
    },
    async updateScenarioEvent(parent, args) {
      const { title, beforeDays, order, afterDays, duration, type, scenario } = args.input;
      const updatedScenarioEvent = {
        title,
        beforeDays,
        order,
        afterDays,
        duration,
        type,
        scenario,
      };
      await scenarioEvent.findByIdAndUpdate(args.id, updatedScenarioEvent);
      return updatedScenarioEvent;
    },
    async deleteScenarioEvent(parent, args) {
      return await scenarioEvent.findByIdAndRemove(args.id);
    },
  },
};

module.exports = resolvers;

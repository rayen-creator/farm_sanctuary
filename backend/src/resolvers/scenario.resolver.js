const Scenario = require('../models/scenario');

const scenarioResolvers = {
  Query: {
    async getScenario(_, { id }) {
      try {
        const scenario = await Scenario.findById(id).populate('scenarioEvents');
        return scenario;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getScenarios() {
      try {
        const scenarios = await Scenario.find().populate('scenarioEvents');
        return scenarios;
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createScenario(_, { input }) {
      try {
        const scenario = new Scenario({
          label: input.label,
          isActive: input.isActive,
          description: input.description,
        });

        const newScenario = await scenario.save();
        return newScenario;
      } catch (err) {
        throw new Error(err);
      }
    },

    async deleteScenario(_, { id }) {
      try {
        const scenario = await Scenario.findByIdAndRemove(id);
        if (!scenario) {
          throw new Error('Scenario not found');
        }
        return scenario;
      } catch (err) {
        throw new Error(err);
      }
    },

    async updateScenario(_, { id, input }) {
      try {
        const updatedScenario = await Scenario.findByIdAndUpdate(
          id,
          {
            label: input.label,
            isActive: input.isActive,
            description: input.description,
          },
          { new: true }
        );
        if (!updatedScenario) {
          throw new Error('Scenario not found');
        }
        return updatedScenario;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

module.exports = scenarioResolvers;

const { AgentInputError } = require('apollo-server-express');
const agentService = require('../services/deliveryAgent');

const agentResolver = {
  DateTime: require('graphql-iso-date').GraphQLDateTime,

  Query: {
    async getdeliveryAgent(_, { id }) {
      try {
        const agent = await agentService.getdeliveryAgent(id);
        if (!agent) {
          throw new AgentInputError('User not found');
        }
        return agent;
      } catch (error) {
        throw new AgentInputError(error.message);
      }
    },
    async getdeliveryAgents() {
      try {
        return await agentService.getdeliveryAgents();
      } catch (error) {
        throw new AgentInputError(error.message);
      }
    },
  },

  Mutation: {
    async createdeliveryAgent(_, { input }) {
      try {
        return await agentService.createdeliveryAgent(input);
      } catch (error) {
        throw new AgentInputError(error.message);
      }
    },

    async updatedeliveryAgent(_, { input }) {
      try {
        const agent = await agentService.updatedeliveryAgent(input);
        if (!agent) {
          throw new AgentInputError('User not found');
        }
        return agent;
      } catch (error) {
        throw new AgentInputError(error.message);
      }
    },

    async deletedeliveryAgent(_, { id }) {
      try {
        const agent = await agentService.deletedeliveryAgent(id);
        if (!agent) {
          throw new AgentInputError('User not found');
        }
        return agent;
      } catch (error) {
        throw new AgentInputError(error.message);
      }
    },
    async updateLocation(_, {  input }) {
        try {
          const agent = await agentService.updateLocation( input);
          if (!agent) {
            throw new AgentInputError('User not found');
          }
          return agent;
        } catch (error) {
          throw new AgentInputError(error.message);
        }
      },
  },
};

module.exports = agentResolver;
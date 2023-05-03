const { AgentInputError } = require("apollo-server-express");
const agentService = require("../services/deliveryAgent");

const agentResolver = {
  DateTime: require("graphql-iso-date").GraphQLDateTime,

  Query: {
    async getdeliveryAgent(_, { id }) {
      try {
        const agent = await agentService.getdeliveryAgent(id);
        if (!agent) {
          throw new AgentInputError("User not found");
        }
        return agent;
      } catch (error) {
        throw new AgentInputError(error.message);
      }
    },
    async getAgentbyOrder(_, { id }) {
      try {
        const agent = await agentService.getAgentbyOrder(id);
        if (!agent) {
          throw new AgentInputError("User not found");
        }
        return agent;
      } catch (error) {
        throw new AgentInputError(error.message);
      }
    },
    async getAvailableAgent(){
      try {
        return await agentService.getAvailableAgent();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async getOrdersbyAgent(_, { id }) {
      try {
        return await agentService.getOrdersbyAgent(id);
      } catch (error) {
        throw new Error(error.message);
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
    async loginDriver(_, { input }) {
      try {
        return await agentService.loginDriver(input);
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async createdeliveryAgent(_, { input }) {
      try {
        return await agentService.createdeliveryAgent(input);
      } catch (error) {
        throw new AgentInputError(error.message);
      }
    },

    async infomail(_, { input }) {
      try {
        return await agentService.infomail(input);
      } catch (error) {
        throw new Error(error);
      }
    },

    async updatedeliveryAgent(_, { id, input }) {
      try {
        const agent = await agentService.updatedeliveryAgent(id, input);
        if (!agent) {
          throw new AgentInputError("User not found");
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
          throw new AgentInputError("User not found");
        }
        return agent;
      } catch (error) {
        throw new AgentInputError(error.message);
      }
    },
    async updateLocation(_, { input }) {
      try {
        const agent = await agentService.updateLocation(input);
        if (!agent) {
          throw new AgentInputError("User not found");
        }
        return agent;
      } catch (error) {
        throw new AgentInputError(error.message);
      }
    },
    async addOrder(_, { id, idorder }) {
      try {
        return await agentService.addOrder(id, idorder);
      } catch (error) {
        throw new AgentInputError(error.message);
      }
    },
  },
};

module.exports = agentResolver;

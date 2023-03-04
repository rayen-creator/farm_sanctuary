const Agent = require("../models/deliveryAgent");

async function getdeliveryAgent(id) {
  return Agent.findById({ _id: id });
}

async function getdeliveryAgents() {
  return Agent.find();
}

async function createdeliveryAgent(input) {
  const agent = new Agent({
    login: input.login,
    password: input.password,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return await agent.save(agent);
}

async function updatedeliveryAgent(input) {
  const id = input.id
  const updatedAgent = {
    login: input.login,
    password: input.password,
    updatedAt: new Date(),
  };

  return await Agent.findByIdAndUpdate({ _id: id }, updatedAgent, { new: true });
}
async function updateLocation( input) {
  const id = input.id
    const updatedAgent = {
        longitude: input.longitude,
        latitude: input.latitude,
        updatedAt: new Date(),
    };
  
    return await Agent.findByIdAndUpdate({ _id: id }, updatedAgent, { new: true });
  }

async function deletedeliveryAgent(id) {
  
  const agent = await Agent.findById({ _id: id });
  if (!agent) {
    return null;
  }
  return await agent.remove();
}




module.exports = {
  getdeliveryAgent,
  getdeliveryAgents,
  createdeliveryAgent,
  updatedeliveryAgent,
  deletedeliveryAgent,
  updateLocation
};

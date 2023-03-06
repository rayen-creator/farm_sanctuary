const Agent = require("../models/deliveryAgent");
const bcrypt = require("bcryptjs");


async function loginDriver(input) {
  const agent = await Agent.findOne({
    login: input.login,
  });

  if (!agent) {
    throw new Error("Invalid email or password");
  }

  const passwordIsValid = bcrypt.compareSync(input.password, agent.password);

  if (!passwordIsValid) {
    throw new AuthenticationError("Unauthorized", {
      message: "Auth failed ! Invalid Password!",
    });
  }
  return {

    login: agent.login,
    message: "OK",
  };
}
async function getdeliveryAgent(id) {
  return Agent.findById({ _id: id });
}

async function getdeliveryAgents() {
  return Agent.find();
}

async function createdeliveryAgent(input) {
  const agent = new Agent({
    login: input.login,
    password: bcrypt.hashSync(input.password, 8),
    email: input.email,
    phone: input.phone,
    image: input.image,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return await agent.save(agent);
}

async function updatedeliveryAgent(input) {
  const id = input.id
  const updatedAgent = {
    login: input.login,
    password: bcrypt.hashSync(input.password, 8),
    email: input.email,
    phone: input.phone,
    image: input.image,
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
  updateLocation,
  loginDriver
};

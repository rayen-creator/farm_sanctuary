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
   //verify duplicated username
   const findlogin = await Agent.findOne({ login: input.login });
   if (findlogin) {
     return {
       message: "Failed! login is already in use!",
       agentloginExists: true,
       emailExists: false,
     };
   }
     //verify duplicated email
   const findemail = await Agent.findOne({ email: input.email });
   if (findemail) {
     return {
       message: "Failed! Email is already in use!",
       emailExists: true,
       usernameExists: false,
     };
   }
   const defaultImage = {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    contentType: 'image/png'
  };
  const image = input.image || defaultImage;
  const agent = new Agent({
    login: input.login,
    password: bcrypt.hashSync(input.password, 8),
    email: input.email,
    fullName: input.fullName,
    phone: input.phone,
    image: image,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await agent.save(agent);
  return {
    message: 'Agent saved successfully',
    
  };
}

async function updatedeliveryAgent(id,input) {
  
  const updatedAgent = ({
    login: input.login,
    password: bcrypt.hashSync(input.password, 8),
    email: input.email,
    fullName: input.fullName,
    phone: input.phone,
    // image: input.image,
   // updatedAt: new Date(),
  });

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

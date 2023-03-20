const Agent = require("../models/deliveryAgent");
const bcrypt = require("bcryptjs");

const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const handlebars = require("handlebars");
const sendEmail = require("./utils/sendEmail");

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
       emailExists: false,
       loginExists: true,
     };
   }
     //verify duplicated email
   const findemail = await Agent.findOne({ email: input.email });
   if (findemail) {
     return {
       message: "Failed! Email is already in use!",
       emailExists: true,
       loginExists: false,
     };
   }
   const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png';
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
    emailExists: false,
    loginExists: false,
  };
}
async function infomail(input) {
  //const agent = await Agent.findOne({ email: input.email });

  //if (!agent) {
  //  throw new Error("Agent not found");
  //}

  const readHTMLFile = (path) => {
    return new Promise((resolve, reject) => {
      readFile(path, "utf8", (err, html) => {
        if (err) {
          reject(err);
        } else {
          const template = handlebars.compile(html);
          const replacements = {
             login: input.login,
             password: input.password,
             
          };
          const htmlToSend = template(replacements);
          const mailOptions = {
            from: process.env.USER,
            to: input.email,
            subject: "Information of Your Farm Sanctuary Account",
            html: htmlToSend,
          };
          resolve(sendEmail(mailOptions));
        }
      });
    });
  };
  try {
    const mail = await readHTMLFile("src/view/driverlogininfo/index.html");

    if (!mail.mailStatus) {
      return {
        message:"error"
       
      };
    }
    return {
      message:"mail sending"
     
    };
  } catch (error) {
    throw new Error(error);
  }
}

async function updatedeliveryAgent(id,input) { 
 const oldagent = await Agent.findById({ _id: id })
  console.log(oldagent.login)
  if((oldagent.email == input.email && oldagent.login == input.login)){
    const updatedAgent = ({
      login:oldagent.login,
      password: bcrypt.hashSync(input.password, 8),
      email: oldagent.email,
      fullName: input.fullName,
      phone: input.phone,
      // image: input.image,
    // updatedAt: new Date(),
    });
    await Agent.findByIdAndUpdate({ _id: id }, updatedAgent, { new: true });
    return {
      message: 'Agent updated successfully',
      emailExists: false,
      loginExists: false,
    };
}else{
  const findlogin = await Agent.findOne({ login: input.login });
   if (findlogin) {
     return {
       message: "Failed! login is already in use!",
       emailExists: false,
       loginExists: true,
     };
   }
     //verify duplicated email
   const findemail = await Agent.findOne({ email: input.email });
   if (findemail) {
     return {
       message: "Failed! Email is already in use!",
       emailExists: true,
       loginExists: false,
     };
   }
   const updatedAgent = ({
    login: input.login,
    password: bcrypt.hashSync(input.password, 8),
    email: input.email,
    fullName: input.fullName,
    phone: input.phone,
    // image: input.image,
  // updatedAt: new Date(),
  });
  await Agent.findByIdAndUpdate({ _id: id }, updatedAgent, { new: true });
  return {
    message: 'Agent updated successfully',
    emailExists: false,
    loginExists: false,
  };
}

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
  infomail,
  getdeliveryAgent,
  getdeliveryAgents,
  createdeliveryAgent,
  updatedeliveryAgent,
  deletedeliveryAgent,
  updateLocation,
  loginDriver
};

const User = require("../models/user");
const { AuthenticationError } = require("apollo-server-express");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("./sendEmail");

async function signup(input) {
  const user = new User({
    username: input.username,
    email: input.email,
    password: bcrypt.hashSync(input.password, 8),
    isActive: input.isActive,
    role: input.role,
    image: input.image,
    createdAt: new Date(),
    updatedAt: new Date(),
    isBlocked: false,
  });
  return await user.save(user);
}

async function signin(input) {
  const user = await User.findOne({
    email: input.email,
  });

  if (!user) {
    throw new Error("Invalid email or password");
    // const error = new Error('Invalid email or password');
    // error.extensions = { statusCode: 404 };
    // throw error;
  }

  const passwordIsValid = bcrypt.compareSync(input.password, user.password);

  if (!passwordIsValid) {
    throw new AuthenticationError("Unauthorized", {
      accessToken: null,
      message: "Auth failed ! Invalid Password!",
    });
  }
  const token = jsonwebtoken.sign({ id: user.email }, process.env.SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });

  return {
    accessToken: token,
    username: user.username,
    message: "OK",
    expiresIn: process.env.JWT_EXPIRE_IN,
  };
}

async function restpwd(input) {
  try {
    // const mail=await sendEmail(input.email, input.subject, input.text);
    const mail=await sendEmail(input.email, input.subject);

    if(!mail.mailStatus){
      return ({
        message:mail.message,
        mailstatus:mail.mailStatus,

      });
    }else{
      return ({
        message:mail.message,
        mailstatus:mail.mailStatus,

      });
    }
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  signin,
  signup,
  restpwd
};

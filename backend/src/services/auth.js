const User = require("../models/user");
const { AuthenticationError } = require("apollo-server-express");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function signup(input) {
  const user = new User({
    username: input.username,
    email: input.email,
    password: bcrypt.hashSync(input.password, 8),
    isActive: input.isActive,
    role: input.role,
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

module.exports = {
  signin,
  signup,
};

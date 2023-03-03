const  User  = require('../models/user');

async function getUser(id) {
  return User.findById(id);
}

async function getUsers() {
  return User.find();
}


async function createUser(input) {
  const user = await User.create(input);
  return await user.save();
}

async function updateUser(id, input) {
  const user = await User.findById(id);
  if (!user) {
    return null;
  }
  await user.update(input);
  return user;
}

async function deleteUser(id) {
  const user = await User.findById(id);
  if (!user) {
    return null;
  }
  await user.remove();
  return user;
}

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
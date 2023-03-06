const User = require("../models/user");

async function getUser(id) {
  return  User.findById(id);
}

async function getUsers() {
  return User.find();
}

async function createUser(input) {
  const user = new User({
    username: input.username,
    email: input.email,
    password: input.password,
    isActive: input.isActive,
    role: input.role,
    image:input.image,
    createdAt: new Date(),
    updatedAt: new Date(),
    isBlocked: false,
  });
  return await user.save(user);
}

async function updateUser(id, input) {
  const updatedUser = {
    username: input.username,
    password: input.password,
    email: input.email,
    isActive: input.isActive,
    role: input.role,
    image:input.image,
    isBlocked: false,
    updatedAt: new Date(),
  };

  return await User.findByIdAndUpdate(id, updatedUser, { new: true });
}

async function deleteUser(id) {
  const user = await User.findById(id);
  if (!user) {
    return null;
  }
  return await user.remove();
}

async function toggleBlockUser(id) {
  const user = await User.findById(id);
  if (!user) {
    throw new Error(`User with ID ${id} not found.`);
  }
  user.isBlocked = !user.isBlocked;
  await user.save();
  return user;
}


module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  toggleBlockUser
};

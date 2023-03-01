const  User  = require('../models/user.model');

const getUser = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error(`User with ID ${id} not found`);
  return user;
};

const getUsers = async () => {
  return await User.find();
};

const createUser =  (args) => {
  const user=new User({
    name:args.name,
    email:args.email
  })
  return user.save();
};

const updateUser = async (id, name, email) => {
  const user = await getUser(id);
  user.name = name || user.name;
  user.email = email || user.email;
  return await user.save();
};

const deleteUser = async (id) => {
  const user = await getUser(id);
  await user.remove();
  return user;
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
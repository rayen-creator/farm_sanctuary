const User = require("../models/user");
const bcrypt = require("bcryptjs");

async function getUser(id) {
  return User.findById(id);
}

async function getUsers() {
  return User.find();
}



async function updateUser(id, input) {
  const updatedUser = {
    username: input.username,
    password: bcrypt.hashSync(input.password, 8),
    email: input.email,
    phone:input.phone,
    isActive: input.isActive,
    role: input.role,
    gender: input.gender,
    image:input.image,
    two_FactAuth_Option: input.two_FactAuth_Option,
    isBlocked: false,
    updatedAt: new Date(),
  };
console.log(input.two_FactAuth_Option)
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
  updateUser,
  deleteUser,
  toggleBlockUser
};

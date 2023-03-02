const userService = require('../services/user');

const userResolver = {
  Query: {
    getUser: async (_, { id }) => await userService.getUser(id),
    getUsers:  () =>  userService.getUsers(),
  },
  Mutation: {
    createUser:  (_, args) =>  userService.createUser(args),
    updateUser:  (_, { id, name, email }) =>  userService.updateUser(id, name, email),
    deleteUser:  (_, { id }) =>  userService.deleteUser(id),
  },
};

module.exports = userResolver;
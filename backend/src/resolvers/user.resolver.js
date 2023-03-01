const userService = require('../services/user');

const userResolver = {
  Query: {
    getUser: async (_, { id }) => await userService.getUser(id),
    getUsers: async () => await userService.getUsers(),
  },
  Mutation: {
    createUser: async (_, args) => await userService.createUser(args),
    updateUser: async (_, { id, name, email }) => await userService.updateUser(id, name, email),
    deleteUser: async (_, { id }) => await userService.deleteUser(id),
  },
};

module.exports = userResolver;
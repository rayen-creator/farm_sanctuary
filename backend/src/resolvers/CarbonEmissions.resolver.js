const { UserInputError } = require("apollo-server-express");

const carbonService = require("../services/carbonfootprint");


const carbonResolver = {
   
    Mutation: {
        async createCarbon(_, { input }) {
            try {
                return await carbonService.createCarbon(input);
            } catch (error) {
                throw new UserInputError(error.message);
            }
        },
       

        
    },
};

module.exports = carbonResolver;
const Event = require("../models/event");
const eventResolver = {
  Query: {},
  Mutation: {
    async add(_, { input }) {
      try {
        const event = new Event({
          title: input.title,
          description: input.description,
          start:input.start, 
          end:input.end,
        });

        return await event.save(event);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

module.exports = eventResolver;

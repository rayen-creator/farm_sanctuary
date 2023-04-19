const badgeService = require("../services/blog/badgesService");

const badgeResolver = {
  Query: {
    async getAllbadges() {
      try {
        return await badgeService.getAllbadges();
      } catch (error) {
        throw Error(error);
      }
    },
    async getBadgeById(_,{id}) {
      try {
        return await badgeService.getBadgeById(id);
      } catch (error) {
        throw Error(error);
      }
    },
  },
  Mutation: {
    async assignBadges(_, { userId }) {
      try {
        return await badgeService.assignBadges(userId);
      } catch (error) {
        throw Error(error);
      }
    },
  },
};

module.exports = badgeResolver;

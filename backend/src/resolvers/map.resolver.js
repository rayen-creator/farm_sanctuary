const mapService  = require("../services/map");


const mapResolver = {
    Query: {
        async getcord (_, { address }) {
            try {
              return await mapService.getcord(address);
            } catch (error) {
              throw new Error(error.message);
            }
          },

    }
};
module.exports = mapResolver;
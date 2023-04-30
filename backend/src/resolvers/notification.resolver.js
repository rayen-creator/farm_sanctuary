const { createNotification, markNotificationAsRead, getnotifications , deleteNotification, getNotificationsByUser } = require('../services/notification');

const resolvers = {
  Query: {
    notifications: async () => {
      const allNotifications = await getnotifications();
      return allNotifications;
    },
    getNotificationsByUser: async (_, { userId }) => {
      const notificationByUser = await getNotificationsByUser(userId);
      return notificationByUser;
    }
  },
  Mutation: {
    createNotification: async (_, { content, type, recipient }) => {
      const newNotification = await createNotification({ content, type, recipient });
      return newNotification;
    },
    markNotificationAsRead: async (_, { id }) => {
      const updatedNotification = await markNotificationAsRead({ id });
      return updatedNotification;
    },
    deleteNotification:async(_,{id})=>{
        const deletedNotification = await deleteNotification({ id });
        return deletedNotification;
    }
  }
};

module.exports = resolvers;
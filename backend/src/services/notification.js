const Notification = require('../models/notification');

const createNotification = async ({ content, type, recipient }) => {
  const notification = new Notification({ content, type, recipient });
  await notification.save();
  return notification;
};

const markNotificationAsRead = async ({ id }) => {
  const notification = await Notification.findByIdAndUpdate(id, { status: 'read' }, { new: true });
  return notification;
};

const getnotifications = async () => {
  const allNotifications = await Notification.find();
  return allNotifications;
};

const deleteNotification = async ({ id }) => {
    const notification = await Notification.findByIdAndDelete(id);
    return notification;
  };

module.exports = { createNotification, markNotificationAsRead, getnotifications , deleteNotification };
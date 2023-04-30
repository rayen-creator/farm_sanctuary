const Notification = require('../models/notification');
const Product = require('../models/product');
const User = require('../models/user');

// const createNotification = async ({ content, type, recipient }) => {
//   const notification = new Notification({ content, type, recipient });
//   await notification.save();
//   return notification.populate({path: "recipient", model: "Users"});
// };

const createNotification = async ({ content, type, recipient }) => {
  const notification = new Notification({ content, type, recipient });
  await notification.save();

  // Check if the recipient is a farmer
  const recipientUser = await User.findById(recipient);
  if (recipientUser.role === "FARMER") {
    // Check if the product belongs to the recipient farmer and is not sold
    const product = await Product.findOne({
      _id: content,
      farmer: recipientUser._id,
      sold: false,
    });
    if (product) {
      // If the product belongs to the recipient farmer and is not sold, mark it as sold and create a notification for the farmer
      product.inSale = false;
      await product.save();

      const farmerNotification = new Notification({
        message: `Your product ${product.name} has been sold for ${product.price}.`,
        recipient: recipientUser._id,
      });
      await farmerNotification.save();

      // Add the notification to the farmer's notifications array
      recipientUser.notifications.push(farmerNotification._id);
      await recipientUser.save();
    }
  }
  return notification.populate({ path: "recipient", model: "User" });
};

async function getNotificationsByUser(userId) {
  const notifications = await Notification.find({ recipient: userId }).populate({path: "recipient", model: "Users"});
  return notifications;
}



const markNotificationAsRead = async ({ id }) => {
  const notification = await Notification.findByIdAndUpdate(id, { status: 'READ' }, { new: true });
  return notification;
};

const getnotifications = async () => {
  const allNotifications = await Notification.find().populate({path: "recipient", model: "Users"});;
  return allNotifications;
};

const deleteNotification = async ({ id }) => {
    const notification = await Notification.findByIdAndDelete(id);
    return notification;
  };





module.exports = { createNotification, markNotificationAsRead, getnotifications , deleteNotification , getNotificationsByUser};
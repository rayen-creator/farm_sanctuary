const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['paiement', 'product', 'delivery'],
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['unread', 'read'],
    default: 'unread',
    required: true
  }
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification 

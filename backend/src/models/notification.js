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
      enum: ['PAIEMENT', 'PRODUCT', 'DELIVERY', 'AGRICULTURE_TIP'],
      required: true
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    seen: {
      type: Boolean,
      default: false,
      required: true
    }
  
  });

  const Notification = mongoose.model('Notification', notificationSchema);
  module.exports = Notification 

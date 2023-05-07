const mongoose = require('mongoose');
const Tip = require('./src/models/tip');
const Notification = require('./src/models/notification');
const User = require('./src/models/user');

let client;

async function createNotifications() {
    if (!client || client.readyState !== 1) {
        client = await mongoose.connect('mongodb://127.0.0.1:27017/farm_sanctuaryDB', { useNewUrlParser: true, useUnifiedTopology: true });
    }

    // Get all tips from the database
    const tips = await Tip.find();

    // Choose a random tip
    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    // Get all users from the database
    const users = await User.find({ daily_tips_option: true });
    // Create a notification from the random tip for each user
    const notifications = users.map(user => {
        return new Notification({
            content: `Tip of the day: ${randomTip.text}`,
            type: 'AGRICULTURE_TIP',
            recipient: user._id
        });
    });

    // Save the notifications to the database
    await Notification.insertMany(notifications);

    console.log('Notifications created successfully');
}

module.exports = createNotifications;
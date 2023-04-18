const Badge = require("../models/badge");
const fs = require('fs');

const encodeFileToBase64 = (filePath) => {

  return new Promise((resolve, reject) => {
    // Read the file as a buffer
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        // Encode the buffer to base64
        const base64String = data.toString('base64');
        resolve(base64String);
      }
    });
  });
};
createBadges = async (req, res, next) => {
   // Encode image file to base64
//  const imagePath = 'path/to/image.png'; // Replace with the actual file path of the image
 const discussion_dynamo = await encodeFileToBase64("public/badges/discussion_dynamo.png");
 const garden_guru = await encodeFileToBase64("public/badges/garden_guru.png");
 const green_thumb = await encodeFileToBase64("public/badges/green_thumb.png");
 const harvest_master = await encodeFileToBase64("public/badges/harvest_master.png");
 const seed_sower = await encodeFileToBase64("public/badges/seed_sower.png");

  const badges = [
    {
      name: "discussion dynamo",
      description: "For users whose posts have received at least 50 comments",
      image: discussion_dynamo,

      createdAt: new Date(),
    },
    {
      name: "garden guru",
      description:
        "For users who have received a total of 200 likes on their articles",
      image: garden_guru,
      createdAt: new Date(),
    },
    {
      name: "green thumb",
      description:
        "For users who have received a total of 50 likes on their articles.",
      image: green_thumb,

      createdAt: new Date(),
    },
    {
      name: "harvest master",
      description:
        "For users who have posted at least 20 articles on your blog.",
      image: harvest_master,

      createdAt: new Date(),
    },
    {
      name: "seed sower",
      description:
        "For users who have posted at least 5 articles on your blog.",
      image: seed_sower,

      createdAt: new Date(),
    },
  ];

  // Check if badges already exist in the database by their names
  const existingBadges = await Badge.find({
    name: { $in: badges.map((badge) => badge.name) },
  });

  // Filter out the badges that already exist
  const newBadges = badges.filter(
    (badge) =>
      !existingBadges.some((existingBadge) => existingBadge.name === badge.name)
  );

  if (newBadges.length > 0) {
    const createdBadges = await Badge.create(newBadges);
  } else {
    return;
  }
  //   next();
};
const createBadgesMiddleware = {
  createBadges: createBadges,
};
module.exports = createBadgesMiddleware;

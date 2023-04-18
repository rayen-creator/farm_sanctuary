const Badge = require("../../models/badge");
const postService = require("./postService");
const commentsService = require("./commentService");
const userService = require("../user");
async function getAllbadges() {
  return await Badge.find();
}

async function assignBadges(userId) {
  const postPerUser = await postService.getPostsByUser(userId);
  const user = await userService.getUser(userId);
  const garden_guru = await Badge.findOne({ name: "garden guru" });
  const discussion_dynamo = await Badge.findOne({ name: "discussion dynamo" });
  const green_thumb = await Badge.findOne({ name: "green thumb" });
  const harvest_master = await Badge.findOne({ name: "harvest master" });
  const seed_sower = await Badge.findOne({ name: "seed sower" });

  const response = {
   name:"",
   image:""
  };
  //objects in JavaScript are compared by reference, not by value, 
  //so even if they have the same properties and values, they may not be considered equal.
  //using those below test fixed the issue
  postPerUser.forEach((post) => {
    if (post.likes >= 2 && !user.badges.some(badge => badge._id.toString() === garden_guru._id.toString())) {
      user.badges.push(garden_guru);
      response.name = garden_guru.name;
      response.image = garden_guru.image;
    }
    if (post.likes >= 4 && !user.badges.some(badge => badge._id.toString() === green_thumb._id.toString())) {
      user.badges.push(green_thumb);
      response.name = green_thumb.name;
      response.image = green_thumb.image;
    }
    if (post.comments.length >= 6 && !user.badges.some(badge => badge._id.toString() === discussion_dynamo._id.toString())) {
      user.badges.push(discussion_dynamo);
      response.name = discussion_dynamo.name;
      response.image=discussion_dynamo.image;
    }
    if (postPerUser.length >= 2 && !user.badges.some(badge => badge._id.toString() === seed_sower._id.toString())) {
      user.badges.push(seed_sower);
      response.name = seed_sower.name;
      response.image=seed_sower.image;
    }
    if (postPerUser.length >= 5 && !user.badges.some(badge => badge._id.toString() === harvest_master._id.toString())) {
      user.badges.push(harvest_master);
      response.name = harvest_master.name;
      response.image = harvest_master.image;
    }
  });
  
  // Save the updated user document
  await user.save();
  
  return response;
}


module.exports = {
  getAllbadges,
  assignBadges,
};

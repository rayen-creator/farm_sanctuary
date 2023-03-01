const mongoose = require('mongoose');
const colors=require('colors');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once("open", () => {
    console.log("Database connected !".bgGreen);
  })
  .on("error", (error) => {
    console.log(`Database connection error : ${error}`.bgRed);
  });
  
  module.exports=mongoose; 

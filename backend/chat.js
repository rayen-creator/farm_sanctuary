// Import required modules
const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
  cors: {
  
    
      origin: 'http://localhost:4200',
      
  }
});

const bodyParser = require('body-parser');
const Message = require('./src/models/messages');

// Use body-parser and cors middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/farm_sanctuaryDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));
// Start the server

const MessageRoute = require('./src/routes/routechat')
app.use('/Message', MessageRoute)
const roomRoute = require('./src/routes/routeroom')
app.use('/Room', roomRoute)

server.listen(3001, () => {
  console.log('listening on *:3001');
});
// Set up Socket.io connection
io.on('connection', (socket) => {
  var username ='';
  console.log(`Connection : SocketId = ${socket.id}`);
 
  socket.on('subscribe', function(data) {
      console.log('subscribe trigged')
      console.log(data)
      const room_data = JSON.stringify(data)
      console.log('+++++++++++++++++++++++++++++++')
      console.log(room_data)
      username = data.userName;
      console.log('++++++++++++++++++++++++')
      console.log(username)
      const roomName = data.conversationName 

      // Join the room
      socket.join(roomName)
      io.to(roomName).emit('newUserToChatRoom',username);
      console.log("Username : ",username, "joined Room Name :" ,roomName)
      // Get the existing conversation history
     })

     socket.on('unsubscribe',function(data) {
      console.log('unsubscribe trigged')
      const room_data = JSON.stringify(data)
      const userName = data.userName;
      const roomName = data.conversationName;
      console.log('++++++++++++++++++++++++')
      console.log(roomName)
  
      console.log(`Username : ${userName} leaved Room Name : ${roomName}`)
      socket.broadcast.to(`${roomName}`).emit('userLeftChatRoom',userName)
      socket.leave(`${roomName}`)
  })
  socket.on('newMessage',function(data) {
    console.log('newMessage triggered')

    
    const messageContent = data.messageContent
    const userName = data.userName;
    const roomName = data.conversationName
    const chatData = {
        userName : userName,
        messageContent : messageContent,
        roomName : roomName
    }

    console.log(`[Room Number ${roomName}] ${userName} : ${messageContent}`)
    // Just pass the data that has been passed from the writer socket
    socket.broadcast.to(`${roomName}`).emit('updateChat',JSON.stringify(chatData)) // Need to be parsed into Kotlin object in Kotlin
})
  socket.on('disconnect', function () {
    console.log("One of sockets disconnected from our server.")
  });

    });


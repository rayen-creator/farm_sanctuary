const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MessageSchema = new Schema({
    User1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    User2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    messageUser1: [Map],
   
    ConvName: {
        type:  String,
        ref : 'ConvName',
      },
    
})
const Message = mongoose.model('Message', MessageSchema)
module.exports = Message
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ConvroomSchema = new Schema({
    ConvName: {
        type: String,
      },
    User1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    User2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
   
    
})
const Convroom = mongoose.model('Room', ConvroomSchema)
module.exports = Convroom
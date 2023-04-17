const { findOne } = require('../models/messages');
const Message=require('../models/messages')

module.exports = {
    
    addmessage: async (req, res, next) => {
        const map1 = new Map();
        const map2 = new Map();
        const { User1_param1,ConvName} = req.params;
      const Exit =await Message.findOne({
        $or: [
            {
                User1: User1_param1,
                ConvName:ConvName
            },
            {
                User2: User1_param1,
                ConvName:ConvName
            },
          ],
        });
        let createdMsg

        if(Exit){
            console.log(Exit);
            if (User1_param1 == Exit.User1)
            {
                await Message.findOneAndUpdate({ ConvName: Exit.ConvName},{$push : {  messageUser1:map2.set("user1",req.body.messageUser1) }}  , {new: true}) 
               }else if (User1_param1 == Exit.User2 )
               {
                await Message.findOneAndUpdate({ ConvName: Exit.ConvName},{$push : { messageUser1:map2.set("user2", req.body.messageUser1) }}  , {new: true})
              }
}else{
   const createdMsg = Message.create({
        User1: req.body.UserM1,
        User2: req.body.UserM2,
        ConvName:req.body.ConvName,
        messageUser1:{ "user1":req.body.messageUser1 }
      
      });    
        
     }
     res.send(createdMsg);

    },
 
    
    showmessage: async (req, res) => {
      var list = []
      var conv = await Message.findOne({ConvName : req.body.ConvName})
  
      if(conv?.messageUser1 != null){
        conv.messageUser1.forEach((element )=>{
        for (const [key, value] of element) {
                  list.push({key : key, value :value})
                }
              });
            
               res.send(list)
      } 
  }
}
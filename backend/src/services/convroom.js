const Room=require('../models/Convroom')

module.exports = {
    getroombyuser12: async (req, res) => {
      try{
        const { User1_param, User2_param } = req.params;
        const room = await Room.findOne({
          $or: [
            {
              User1: User1_param,
              User2: User2_param,
            },
            {
              User1: User2_param,
              User2: User1_param,
            },
          ],
        });

      }catch (error){

      }

      res.status(500).json({ error: error.message });
          
    },

     creatrome: async (req,res)=>{
        try {
          const { User1_param, User2_param } = req.params;
          const Existingrome= await Room.findOne({
            $or: [
              {
                User1: User1_param,
                User2: User2_param,
              },
              {
                User1: User2_param,
                User2: User1_param,
              },
            ],
          });
          
          if (Existingrome )
         {
             res.send(Existingrome.ConvName)
         }else{
            const createdroom = Room.create({
                User1:User1_param,
                User2:User2_param,
                ConvName:req.body.ConvName
               
              
              });
              res.status(200).json(createdroom.ConvName )
            }


        } catch (error) {
              res.status(500).json({ error: error.message });
            }
  },
  deleteroom: async (req,res)=>{
    try{
    
      const room = await Room.findOne( req.body.ConvName)
      if(room){
       await room.remove();
       
      }
      res.status(200).json({ room: room});

    }catch(error) {
      res.status(500).json(ConvName);
    }
  }


}

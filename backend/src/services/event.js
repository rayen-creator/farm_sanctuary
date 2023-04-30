const Event=require ("../models/event") 

async function getEvent(id) {
    return await Event.findById(id);
}



async function getEvents (){ 
    return await Event.find();
    //  return await Event.find().populate({path: "user", model: "Users"});
}


async function createEvent(input){
    const event = new Event({
        title: input.title,
        description: input.description,
        start:input.start, 
        end:input.end,
      });

      return await event.save(event);
}




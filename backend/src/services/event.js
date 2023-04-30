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
        type:input.type,
      });

      return await event.save(event);
}

async function deleteEvent(id){ 
    const event= await Event.findById({ _id: id });
    if (!event) {
        return null;
    }
    return await event.remove();
}

async function updateEvent(id, input) {
    const updatedEvent = {
      title: input.title,
      description: input.description,
      start: input.start,
      end: input.end,
      type: input.type,
    };
    await Event.findByIdAndUpdate(id, updatedEvent);
    return updatedEvent;
  }
  

module.exports ={
    getEvents, 
    getEvent,
    createEvent,
    deleteEvent, 
    updateEvent
}



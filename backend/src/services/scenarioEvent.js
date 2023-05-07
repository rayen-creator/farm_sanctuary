const scenarioEvent=require ("../models/scenarioEvent")

async function getscenarioEvent(id) {
    return await scenarioEvent.findById(id);
}



async function getscenarioEvents (){ 
    return await scenarioEvent.find();
    //  return await scenarioEvent.find().populate({path: "user", model: "Users"});
}


async function createscenarioEvent(input){
    const scenarioEvent = new scenarioEvent({
        title: input.title,
        beforeDays: input.beforeDays,
        order:input.order, 
        AfterDays:input.AfterDays,
        duration:input.AfterDays,
        scenario:input.scenario,
        type:input.type,
      });

      return await scenarioEvent.save(scenarioEvent);
}

async function deletescenarioEvent(id){ 
    const scenarioEvent= await scenarioEvent.findById({ _id: id });
    if (!scenarioEvent) {
        return null;
    }
    return await scenarioEvent.remove();
}

async function updatescenarioEvent(id, input) {
    const updatedscenarioEvent = {
        title: input.title,
        beforeDays: input.beforeDays,
        order:input.order, 
        AfterDays:input.AfterDays,
        duration:input.AfterDays,
        scenario:input.scenario,
        type:input.type,
    };
    await scenarioEvent.findByIdAndUpdate(id, updatedscenarioEvent);
    return updatedscenarioEvent;
  }
  

module.exports ={
    getscenarioEvents, 
    getscenarioEvent,
    createscenarioEvent,
    deletescenarioEvent, 
    updatescenarioEvent
}



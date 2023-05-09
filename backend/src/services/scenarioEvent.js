const ScenarioEvent=require ("../models/scenarioEvent")

async function getScenarioEvents(id) {
    const res= await ScenarioEvent.findOne({ scenario: id }).populate({
      path: 'scenario',
      model: 'Scenario',
    });
    return res;
  }



async function createscenarioEvent(input){
    const scenarioEvent = new ScenarioEvent({
        title: input.title,

        beforeDays: input.beforeDays,
        order:input.order, 
        afterDays:input.afterDays,
        type:input.type,
      });

      return await scenarioEvent.save();
}

  

module.exports ={
    getScenarioEvents, 
    createscenarioEvent,

}



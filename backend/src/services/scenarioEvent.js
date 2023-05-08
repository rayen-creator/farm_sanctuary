const ScenarioEvent=require ("../models/scenarioEvent")

async function getScenarioEvents(id) {
    const res= await ScenarioEvent.findOne({ scenario: id }).populate({
      path: 'scenario',
      model: 'Scenario',
    });
    return res;
  }



async function createscenarioEvent(input){
    const scenarioEvent = new scenarioEvent({
        title: input.title,

        beforeDays: input.beforeDays,
        order:input.order, 
        afterDays:input.afterDays,
        duration:input.AfterDays,
        scenario:input.scenario,
        type:input.type,
      });

      return await scenarioEvent.save(scenarioEvent);
}

  

module.exports ={
    getScenarioEvents, 
    createscenarioEvent,

}



const Scenario=require ("../models/scenario")

async function getScenario(id) {
  console.log('id0',id);
    return await Scenario.findById(id);;
}

async function getScenarios (){ 
    return await Scenario.find();
}

async function createScenario(input){
    const scenario = new Scenario({
        label: input.label,
        isActive: input.isActive,
        description:input.description,
      });

      return await scenario.save();
}

// Service
async function createEventsFromScenario (id){
    console.log("Step 1: Finding scenario by id and populating scenarioEvents");
    const scenario = await Scenario.findById(id)
    .populate({
      path: "scenarioEvents",
      model: "ScenarioEvent"
    });

    const scenarioEvents = scenario.scenarioEvents.sort((a, b) => a.order - b.order);
    const events = [Event];
    let previousEndDate = new Date();
  
    console.log("Step 2: Creating events from scenario events");
    for (let i = 0; i < scenarioEvents.length; i++) {
      const scenarioEvent = scenarioEvents[i];
      const event = new Event({
        title: scenarioEvent.title,
        description: scenarioEvent.description,
        start: previousEndDate.toISOString(),
        end: new Date(previousEndDate.getTime() + scenarioEvent.afterDays * 24 * 60 * 60 * 1000).toISOString(),
        type: scenarioEvent.type,
        scenarioLabel: scenario.label,
        isAuto: true,
      });
      events.push(event);
      previousEndDate = new Date(event.end);
    }
  
    console.log("Step 3: Saving events");
    await Promise.all(events.map((event) => event.save()));
  
    console.log("Step 4: Returning events");
    return events;
  };
  
 
module.exports ={
    getScenarios, 
    getScenario,
    createScenario,
    createEventsFromScenario,

}


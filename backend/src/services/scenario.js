const Scenario=require ("../models/scenario")
const Event=require ("../models/event")

async function getScenario(id) {
  console.log('id0',id);
    return await Scenario.findById(id);;
}

async function getScenarios (){ 
    return await Scenario.find();
}



async function createScenario(input) {
    const scenario = new Scenario({
        label: input.label,
        isActive: input.isActive,
        description: input.description,
        scenarioEvents: input.scenarioEvents,
    });

    return await scenario.save();
}

// Service
async function createEventsFromScenario(label) {
    console.log("Step 1: Finding scenario by id and populating scenarioEvents");
    const scenario = await Scenario.findOne({ label: label }).populate({
        path: "scenarioEvents",
        model: "ScenarioEvent",
    });
    if (!scenario) {
        throw new Error(`Scenario with label ${label} not found`);
    }
    const scenarioEvents = scenario.scenarioEvents.sort((a, b) => a.order - b.order);
    const events = [];
    let previousEndDate = new Date();

    console.log("Step 2: Creating events from scenario events");
    for (let i = 0; i < scenarioEvents.length; i++) {
        const scenarioEvent = scenarioEvents[i];
        const afterDays = parseInt(scenarioEvent.afterDays);
        if (isNaN(afterDays)) {
            throw new Error(`Invalid afterDays value: ${scenarioEvent.afterDays}`);
        }
        previousEndDate = new Date(previousEndDate.getTime() + afterDays * 24 * 60 * 60 * 1000); // update previousEndDate before creating new event
        const event = new Event({
            title: scenarioEvent.title,
            description: scenarioEvent.description,
            start: previousEndDate.toISOString(),
            end: new Date(previousEndDate.getTime() + 1 * 60 * 60 * 1000).toISOString(), // set end time to 1 hour after start time
            type: scenarioEvent.type,
            scenarioLabel: scenario.label,
            isAuto: true,
        });
        previousEndDate = new Date(event.end);
        events.push(event);
    }

    console.log("Step 3: Saving events");
    await Promise.all(events.map((event) => event.save()));

    console.log("Step 4: Returning events");
    return events;
}
  
 
module.exports ={
    getScenarios, 
    getScenario,
    createScenario,
    createEventsFromScenario,

}


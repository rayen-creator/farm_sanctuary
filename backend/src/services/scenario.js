const Scenario=require ("../models/scenario")

async function getScenario(id) {
    return await Scenario.findById(id);
}



async function getScenarios (){ 
    return await Scenario.find();
    //  return await Scenario.find().populate({path: "user", model: "Users"});
}


async function createScenario(input){
    const Scenario = new Scenario({
        label: input.label,
        isActive: Boolean,
        description:String,
      
      });

      return await Scenario.save(Scenario);
}

async function deleteScenario(id){ 
    const Scenario= await Scenario.findById({ _id: id });
    if (!Scenario) {
        return null;
    }
    return await Scenario.remove();
}

async function updateScenario(id, input) {
    const updatedScenario = {
        label: String,
        isActive: Boolean,
        description:String,
      
    };
    await Scenario.findByIdAndUpdate(id, updatedScenario);
    return updatedScenario;
  }
  

module.exports ={
    getScenarios, 
    getScenario,
    createScenario,
    deleteScenario, 
    updateScenario
}


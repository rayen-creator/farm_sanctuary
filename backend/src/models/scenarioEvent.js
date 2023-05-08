const mongoose = require("mongoose");
const Event = require("./event"); // import the event model

const scenarioEventSchema = new mongoose.Schema({
  title: String,
  beforeDays: Number,
  afterDays:Number,
  order:Number, 
  duration:Number,
  type: {
    type: String,
    enum: Object.values(Event.schema.path("type").enumValues) // use the enumValues from the Event model
  },
  scenario: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Scenario"
},
});

const ScenarioEvent=mongoose.model('ScenarioEvent', scenarioEventSchema);
module.exports=ScenarioEvent
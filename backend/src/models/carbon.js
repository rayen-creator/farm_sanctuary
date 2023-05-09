const mongoose = require("mongoose");

const carbonSchema = new mongoose.Schema(
  {
    date : {
        type: Date,
        default: Date.now,
    },
    energy_emissions: Number,
    Electricity_Emissions: Number,
    fertilizer_emissions: Number,
    livestock_emissions: Number,
    crop_emissions: Number,
    totalcarbonfootprint: Number,
   
    

  },
  { timestamps: true }
);
const carbon = mongoose.model("carbonSchema", carbonSchema);

module.exports = carbon;
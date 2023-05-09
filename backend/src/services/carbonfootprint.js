const Carbon = require("../models/carbon");

function electricity_related_emissions(usageInKwh, typeofcarbon) {
  switch (typeofcarbon) {
    case "coal":
      carbonIntensityValue = 2.26 / 2.2046;
      break;
    case "natural gas":
      carbonIntensityValue = 0.97 / 2.2046;
      break;
    case "petroleum":
      carbonIntensityValue = 2.44 / 2.2046;
      break;
    default:
      console.error(`Invalid fuel type: ${fuelType}`);
      carbonIntensityValue = 0;
      break;
  }

  return usageInKwh * carbonIntensityValue;
}

function fertilizer_related_emissions(fertilizerConsumption, fertilizerType) {
  let fertilizerEmissionFactor;
  switch (fertilizerType) {
    case "ammonium nitrate":
      fertilizerEmissionFactor = 6.95;
      break;
    case "ammonium sulfate":
      fertilizerEmissionFactor = 2.14;
      break;
    case "potassium chloride":
      fertilizerEmissionFactor = 1.45;
      break;
    case "nitrogen-based":
      fertilizerEmissionFactor = 3.74;
      break;
    default:
      console.error(`Invalid fertilizer type: ${fertilizerType}`);
      return 0;
  }
  return fertilizerConsumption * fertilizerEmissionFactor;
}

function livestock_related_emissions(
  numBeefCattle,
  numDairyCattle,
  numPigs,
  numPoultry,
  numSheep,
  numGoats
) {
  // Define the emission factors for each type of livestock
  const beefEmissionFactor = 400; // kg CO2e per animal per year
  const dairyEmissionFactor = 150; // kg CO2e per animal per year
  const pigEmissionFactor = 25; // kg CO2e per animal per year
  const poultryEmissionFactor = 0.2; // kg CO2e per bird per year
  const sheepEmissionFactor = 15; // kg CO2e per animal per year
  const goatEmissionFactor = 15; // kg CO2e per animal per year

  // Calculate the total emissions from each type of livestock
  const totalBeefEmissions = numBeefCattle * beefEmissionFactor;
  const totalDairyEmissions = numDairyCattle * dairyEmissionFactor;
  const totalPigEmissions = numPigs * pigEmissionFactor;
  const totalPoultryEmissions = numPoultry * poultryEmissionFactor;
  const totalSheepEmissions = numSheep * sheepEmissionFactor;
  const totalGoatEmissions = numGoats * goatEmissionFactor;

  // Calculate the total emissions from all livestock
  return (
    (totalBeefEmissions +
      totalDairyEmissions +
      totalPigEmissions +
      totalPoultryEmissions +
      totalSheepEmissions +
      totalGoatEmissions) /
    12
  );
}
// cropTransportDistance,
//   cropProduction,
//   typeofcrop,
//   fuelused,
//   typeoffuel,
//   landsize
function crop_related_emissions(
  
  cropTransportDistance, 
  cropProduction,
   typeofcrop, 
   typeoffuel,
   fuelused, 
   landsize
) {
  let fuelemission;
  let cropTransportEmissions;

  if (typeoffuel === "gasoline") {
    fuelemission = fuelused * 2.3;
  } else {
    fuelemission = fuelused * 2.7;
  }

  const avgWeightPerKg = cropProduction / landsize;
  const cropTransportEmissionFactor = fuelemission / cropTransportDistance;

  let cropEmissionFactor;

  switch (typeofcrop) {
    case "Cereals":
      cropEmissionFactor = 0.51;
      break;
    case "Barley":
      cropEmissionFactor = 0.66;
      break;
    case "Maize":
      cropEmissionFactor = 0.57;
      break;
    case "Sorghum":
      cropEmissionFactor = 0.43;
      break;
    case "Wheat":
      cropEmissionFactor = 0.4;
      break;
    case "Legumes and Oilseeds":
      cropEmissionFactor = 0.83;
      break;
    case "Dry bean":
      cropEmissionFactor = 0.38;
      break;
    case "Groundnut":
      cropEmissionFactor = 1.3;
      break;
    case "Soybean":
      cropEmissionFactor = 1.28;
      break;
    case "Sunflower":
      cropEmissionFactor = 0.36;
      break;
    case "Vegetables":
      cropEmissionFactor = 1.52;
      break;
    case "Cabbage":
      cropEmissionFactor = 1.53;
      break;
    case "Other vegetables":
      cropEmissionFactor = 1.43;
      break;
    case "Potatoes":
      cropEmissionFactor = 1.48;
      break;
    case "Tomatoes":
      cropEmissionFactor = 1.65;
      break;
    case "Other field crops":
      cropEmissionFactor = 0.6;
      break;
    case "Cotton":
      cropEmissionFactor = 0.67;
      break;
    case "Fodder":
      cropEmissionFactor = 0.25;
      break;
    case "Other":
      cropEmissionFactor = 0.33;
      break;
    case "Sugarcane":
      cropEmissionFactor = 1.39;
      break;
    case "Tobacco":
      cropEmissionFactor = 0.36;
      break;
    default:
      console.error(`Invalid crop type: ${typeofcrop}`);
      cropEmissionFactor = 0;
  }

  cropTransportEmissions =
    cropTransportDistance * cropTransportEmissionFactor * avgWeightPerKg;
  const cropEmissions = cropProduction * cropEmissionFactor;
  const cropRelatedEmissions = cropTransportEmissions + cropEmissions;

  return cropRelatedEmissions;
}

function totalcarbonfootprint(
  ElectricityCarbonEmissions,
  energyRelatedEmissions,
  fertilizerEmissions,
  livestockEmissions,
  cropRelatedEmissions
) {
  return (
    ElectricityCarbonEmissions +
    energyRelatedEmissions +
    fertilizerEmissions +
    livestockEmissions +
    cropRelatedEmissions
  );
}

function energy_related_emissions(
  dieselFuelConsumption,
  gasolineFuelConsumption
) {
  const dieselFuelEmissions = dieselFuelConsumption * 2.68;
  const gasolineFuelEmissions = gasolineFuelConsumption * 2.32;
  console.log("energy", dieselFuelConsumption);
  return dieselFuelEmissions + gasolineFuelEmissions;
}

async function createCarbon(input) {
  console.log("input: " + input.gasolineFuelConsumption);
  const energy_emissions = energy_related_emissions(
    input.dieselFuelConsumption,
    input.gasolineFuelConsumption
  );
  const Electricity_Emissions = electricity_related_emissions(
    input.usageInKwh,
    input.typeofcarbon
  );
  const fertilizer_emissions = fertilizer_related_emissions(
    input.fertilizerConsumption,
    input.fertilizerType
  );
  const livestock_emissions = livestock_related_emissions(
    input.numBeefCattle,
    input.numDairyCattle,
    input.numPigs,
    input.numPoultry,
    input.numSheep,
    input.numGoats
  );
  
  const crop_emissions = crop_related_emissions(input.cropTransportDistance, input.cropProduction, input.typeofcrop, input.typeoffuel,input.fuelused, input.landsize)
  
  const total = totalcarbonfootprint(Electricity_Emissions, energy_emissions, fertilizer_emissions, livestock_emissions, crop_emissions)

  console.log("crop_emissions: ",crop_emissions)
  console.log("Electricity_Emissions: ", Electricity_Emissions);
  console.log("fertilizer_emissions: ", fertilizer_emissions);
  console.log("livestock_emissions: ",livestock_emissions)
  console.log("energy_emissions: ", energy_emissions);
  console.log("total: ", total);

  const carbon = new Carbon({
      energy_emissions: energy_emissions,
      Electricity_Emissions: Electricity_Emissions,
      fertilizer_emissions: fertilizer_emissions,
      livestock_emissions: livestock_emissions,
      crop_emissions: crop_emissions,
      totalcarbonfootprint: total,
  });
  console.log("carbon: ", carbon);
  await carbon.save();

  return {
    carbon : carbon,
    message: "carbon added!",
  };
}
module.exports = {
  createCarbon,
};

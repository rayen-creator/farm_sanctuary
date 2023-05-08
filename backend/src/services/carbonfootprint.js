
async function energy_related_emissions(dieselFuelConsumption, gasolineFuelConsumption) {
    const dieselFuelEmissionFactor = 2.68; // in kg CO2 per liter
    const gasolineFuelEmissionFactor = 2.32; // in kg CO2 per liter

    const dieselFuelEmissions = dieselFuelConsumption * dieselFuelEmissionFactor;
    const gasolineFuelEmissions = gasolineFuelConsumption * gasolineFuelEmissionFactor;

    return dieselFuelEmissions + gasolineFuelEmissions;
}

function calculateElectricityCarbonEmissions(usageInKwh, typeofcarbon) {
    switch (typeofcarbon) {
        case 'coal':
            carbonIntensityValue = 2.26 / 2.2046;
            break;
        case 'natural gas':
            carbonIntensityValue = 0.97 / 2.2046;
            break;
        case 'petroleum':
            carbonIntensityValue = 2.44 / 2.2046;
            break;
        default:
            console.error(`Invalid fuel type: ${fuelType}`);
            carbonIntensityValue = 0;
            break;
    }

    return usageInKwh * carbonIntensityValue;
}
async function fertilizer_related_emissions(fertilizerConsumption, fertilizerType) {
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

async function livestock_related_emissions(
    numBeefCattle,
    numDairyCattle,
    numPigs,
    numPoultry,
    numSheep
) {
    // Calculate the total emissions from each type of livestock
    const totalBeefEmissions = numBeefCattle * beefEmissionFactor;
    const totalDairyEmissions = numDairyCattle * dairyEmissionFactor;
    const totalPigEmissions = numPigs * pigEmissionFactor;
    const totalPoultryEmissions = numPoultry * poultryEmissionFactor;
    const totalSheepEmissions = numSheep * sheepEmissionFactor;
    const totalGoatEmissions = numGoats * goatEmissionFactor;

    // Calculate the total emissions from all livestock
    return totalBeefEmissions + totalDairyEmissions + totalPigEmissions + totalPoultryEmissions + totalSheepEmissions + totalGoatEmissions;

}
async function crop_related_emissions(cropTransportDistance, cropProduction, typeofcrop, fuelused, typeoffuel, land) {
    let fuelemission;
    let cropTransportEmissions;

    if (typeoffuel === "gasoline") {
        fuelemission = fuelused * 2.3;
    } else {
        fuelemission = fuelused * 2.7;
    }

    const avgWeightPerKg = cropProduction / land;
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

    cropTransportEmissions = cropTransportDistance * cropTransportEmissionFactor * avgWeightPerKg;
    const cropEmissions = cropProduction * cropEmissionFactor;
    const cropRelatedEmissions = cropTransportEmissions + cropEmissions;

    return cropRelatedEmissions;
}


async function totalcarbonfootprint(ElectricityCarbonEmissions, energyRelatedEmissions, fertilizerEmissions, livestockEmissions, cropRelatedEmissions){
return ElectricityCarbonEmissions + energyRelatedEmissions + fertilizerEmissions + livestockEmissions + cropRelatedEmissions;
}



module.exports = {
    energy_related_emissions,
    calculateElectricityCarbonEmissions,
    fertilizer_related_emissions,
    livestock_related_emissions,
    crop_related_emissions,
    totalcarbonfootprint


}
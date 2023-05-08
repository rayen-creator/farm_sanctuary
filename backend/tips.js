const mongoose = require('mongoose');
const Tip = require('./src/models/tip');

mongoose.connect('mongodb://127.0.0.1:27017/farm_sanctuaryDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const tips = [
            { text: 'Use cover crops to improve soil health and prevent erosion.', dateAdded: new Date() },
            { text: 'Rotate crops to prevent pests and diseases from building up in the soil.', dateAdded: new Date() },
            { text: 'Use natural predators like ladybugs and praying mantises to control pests instead of pesticides.', dateAdded: new Date() },
            { text: 'Conserve water by using drip irrigation and mulching to reduce evaporation.', dateAdded: new Date() },
            { text: 'Compost your kitchen scraps and yard waste to create nutrient-rich soil.', dateAdded: new Date() },
            { text: 'Plant trees and shrubs to provide shade, prevent erosion, and attract pollinators.', dateAdded: new Date() },
            { text: 'Use organic fertilizers like compost, manure, and bone meal instead of chemical fertilizers.', dateAdded: new Date() },
            { text: 'Practice integrated pest management (IPM) to control pests using a combination of cultural, biological, and chemical methods.', dateAdded: new Date() },
            { text: 'Use crop rotation and cover crops to reduce the need for synthetic fertilizers and pesticides.', dateAdded: new Date() },
            { text: 'Use natural pest deterrents like neem oil, diatomaceous earth, and garlic spray instead of chemical pesticides.', dateAdded: new Date() },
            { text: 'Plant native species to support local ecosystems and reduce the need for water and fertilizer.', dateAdded: new Date() },
            { text: 'Use rainwater harvesting to collect and store rainwater for irrigation.', dateAdded: new Date() },
            { text: 'Use companion planting to create mutually beneficial relationships between crops.', dateAdded: new Date() },
            { text: 'Create a habitat for beneficial insects and pollinators by planting flowers and providing shelter.', dateAdded: new Date() },
            { text: 'Use heirloom and open-pollinated seeds to preserve genetic diversity and adaptability in crops.', dateAdded: new Date() },
            { text: 'Use mulch to conserve moisture, suppress weeds, and improve soil health.', dateAdded: new Date() },
            { text: 'Practice no-till farming to reduce soil erosion and improve soil health.', dateAdded: new Date() },
            { text: 'Use biodegradable and compostable materials for packaging and other materials.', dateAdded: new Date() },
            { text: 'Use renewable energy sources like solar and wind power to reduce greenhouse gas emissions.', dateAdded: new Date() },
            { text: 'Practice agroforestry to combine agriculture and forestry to create sustainable land use systems.', dateAdded: new Date() },
            { text: 'Reduce food waste by composting scraps and donating excess food.', dateAdded: new Date() },
            { text: 'Support local and sustainable agriculture by buying from farmers markets and community-supported agriculture (CSA) programs.', dateAdded: new Date() },
            { text: 'Reduce carbon emissions by using electric or hybrid vehicles on the farm.', dateAdded: new Date() },
            { text: 'Implement efficient irrigation systems to reduce water waste.', dateAdded: new Date() },
            { text: 'Use natural building materials like straw bales, cob, and adobe for farm buildings.', dateAdded: new Date() },
        ];

        return Tip.insertMany(tips);
    })
    .then(() => {
        console.log('Tips inserted successfully');
        mongoose.connection.close();
    })
    .catch(err => console.error('Error inserting tips', err));
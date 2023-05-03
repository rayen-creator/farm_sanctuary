const fetch = require('node-fetch');

async function getcord(address) {
  console.log("address back:",address)
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
        const data = await response.json();
        if (data.length === 0) {
          throw new Error('No results found');
        }
        return{
        //   data:data,
          latitude: data[0].lat,
          longitude: data[0].lon,
         
        };
    
    
}
module.exports = {
    getcord
}
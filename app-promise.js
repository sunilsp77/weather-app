const yargs = require('yargs');
const axios = require('axios');

const argv = yargs.options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
})
.help()
.alias('help','h')
.argv;


var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=NHW6tVrZ1pcMLLqvbBAOjgH0H4RZ91sp&location= ${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  if(response.data.status === 'ZERO_RESULTS'){
    throw new Erro('Unable to find that address.');
  }

  var lat = response.data.results[0].locations[0].latLng.lat;
  var lng = response.data.results[0].locations[0].latLng.lng;
  var weatherUrl = `https://api.darksky.net/forecast/7300e09d99f279c12848f095ae51238e/${lat},${lng}`;
  console.log(response.data.results[0].providedLocation.location);

  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${(temperature -32)* .5556} Celsius. It feels like ${(apparentTemperature - 32)* .5556} Celsius.`);
}).catch((e) => {
  if(e.code === 'ENOTFOUND'){
    console.log('Unable to connect to Google Servers');
  } else {
      console.log(e.message);
  }
})

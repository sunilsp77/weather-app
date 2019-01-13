const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

// console.log(argv);
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if(errorMessage) {
    console.log(errorMessage);
  }else {
    console.log(results.address);
    weather.getweather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if(errorMessage) {
        console.log(errorMessage);
      }else {
        console.log(`It's currently ${(weatherResults.temperature -32)* .5556} Celsius. It feels like ${(weatherResults.apparentTemperature - 32)* .5556}. Celsius`);
      }
    });
  }
});

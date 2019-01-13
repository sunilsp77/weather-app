const request = require('request');

var getweather = (lat, lng, callback) =>{
  request({
    url: `https://api.darksky.net/forecast/7300e09d99f279c12848f095ae51238e/${lat},${lng}`,
    json: true
  },(error,response,body) => {
    if (error){
      callback('Unable to connect to Forecast.io Server.');
    }else if (body.code === 400) {
      callback('Unable to fetch weather.');
    }else{
      callback(undefined,{
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
  });
};

module.exports.getweather = getweather;

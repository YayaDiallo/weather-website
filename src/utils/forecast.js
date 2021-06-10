const axios = require('axios');

const forecast = (latitude, longitude, callback) => {
  const params = {
    access_key: 'e86d8a01073da8853047bd2ff2efbd1c',
    query: `${latitude},${longitude}`,
  };
  const url = 'http://api.weatherstack.com/current';

  axios
    .get(url, { params })
    .then(({ data }) => {
      // const data = response.data;
      // console.log(data, 'data');
      callback(
        undefined,
        `${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degrees out. It feels like ${data.current.feelslike} degrees out. The humidity is ${data.current.humidity}%.`
      );
    })
    .catch((err) => {
      // console.log(err, 'err');
      let message =
        typeof err.response !== 'undefined'
          ? err.response.data.message
          : err.message;
      callback(message, undefined);
    });
};

module.exports = forecast;

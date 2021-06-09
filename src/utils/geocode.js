const axios = require('axios');

const geocode = (address, callback) => {
  const token =
    'pk.eyJ1IjoieWF5YWRldiIsImEiOiJja2xnazhxMnIxZ21vMnltZ3JjM2F0MHp5In0.9dxdeMNzrhY7ZpWH7nM1Zw';
  // encodeURIComponent permet de gérer les carac spéciaux ds les url
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${token}&limit=1`;

  axios
    .get(url)
    .then((response) => {
      // console.log(response.data);
      if (response.data.features.length < 1) {
        callback('Location not found. Try another search', undefined);
      } else {
        const { center, place_name } = response.data.features[0];
        callback(undefined, {
          latitude: center[1],
          longitude: center[0],
          location: place_name,
        });
      }
    })
    .catch((err) => {
      let message =
        typeof err.response !== 'undefined'
          ? err.response.data.message
          : err.message;
      // console.log('error', message);
      callback(message, undefined);
    });
};

module.exports = geocode;

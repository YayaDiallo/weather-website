const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
// Customize the views Express directory to point to the views custom folder
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlers engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Weather', name: 'Issa Diallo' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Me', name: 'Issa Diallo' });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'This is some helpful text.',
    name: 'Issa Diallo',
  });
});

app.get('/weather', (req, res) => {
  let address = req.query.address;
  if (!address) {
    return res.send({ error: 'You must provide an address!' });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return res.send({ error });
      }
      return res.send({ forecast, location, address });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({ error: 'You must provide a seach term' });
  }
  console.log(req.query.search);
  res.send({ products: [] });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not found',
    name: 'Issa',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found',
    name: 'Issa',
  });
});

// APP LISTEN
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

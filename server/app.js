const express = require('express')
const fetch = require('node-fetch')
require('dotenv').config();
const cors = require('cors');
const { json } = require('express');
console.log(process.env.API);

const app = express()
const port = 3000

app.use(cors())
app.get('/', (req, res) => {
  res.sendFile("C:\\\Users\\\joshu\\\Desktop\\\web app\\\weather-app-main\\\index.html");
})

app.get('/api/weather', async(req, res) => {
  const long = req.query.lon;
  const lat = req.query.lat;
  const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.API}&units=metric`
// send response to our own server
  const apiResponse = await fetch(base);
// await response from original server
  const weatherData = await apiResponse.json();
  console.log(weatherData);

// send response back to user
  res.json(weatherData);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
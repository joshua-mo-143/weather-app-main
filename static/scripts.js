const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');

// on page load
window.addEventListener('load', () => {
    let long;
    let lat;
     // Accessing Geolocation of User
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
         long = position.coords.longitude;
         lat = position.coords.latitude;
         const base = `http://localhost:3000/api/weather?lat=${lat}&lon=${long}`
         console.log(base);

        //make request
         fetch(base)
        .then((response) => {
        
          //return actual data
          return response.json();
        })

        // destructure data into vars
        .then((data) => {
          const { temp } = data.main;
          const place = data.name;
          const { description, icon } = data.weather[0];
          const { sunrise, sunset } = data.sys;

          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          const fahrenheit = (temp * 9) / 5 + 32;

          // Converting Epoch(Unix) time to GMT
          const sunriseGMT = new Date(sunrise * 1000);
          const sunsetGMT = new Date(sunset * 1000);
          
          //DOM manipulation
          loc.textContent = `${place}`;
          desc.textContent = `${description}`;
          tempC.textContent = `${temp.toFixed(2)} °C`;
          tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
          sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
          sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
        });
  });
}
})
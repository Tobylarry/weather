//Css selectors used to manipulate HTML Element
let cityCountry = document.querySelector(".cityCountry");
let degree = document.querySelector(".degree");
let weatherCondition = document.querySelector(".weatherCondition");
let img = document.querySelector(".img");
let currentTime = document.querySelector(".currentTime");
let wind = document.querySelector(".wind");
let humidity = document.querySelector(".humidity");
let highTemp = document.querySelector(".highTemp");
let lowTemp = document.querySelector(".lowTemp");

let date = new Date(); //Date Object to retrieve Hour and Minute at every point in time
if (date.getMinutes() < 10) {
  currentTime.textContent = `${date.getHours()}:0${date.getMinutes()}`;
} else {
  currentTime.textContent = `${date.getHours()}:${date.getMinutes()}`;
}

let lat;
let lon;

getLocation();

//Method is used to track users exact location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else {
    console.log("Position Not available");
  }
}

//Method passes longitude and latitude values into API
//Method returns data in regards to weather condition in the specific location
function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  fetch(
    `https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${lon}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      cityCountry.innerHTML = `${data.name}, ${data.sys.country}`;
      degree.innerHTML = `${Math.round(data.main.temp)}<sup>o</sup>`;
      weatherCondition.innerHTML = `${data.weather[0].main}`;
      img.src = `${data.weather[0].icon}`;
      humidity.innerHTML = `${data.main.humidity}`;
      wind.textContent = `${data.wind.speed}`;
      highTemp.innerHTML = `${Math.round(data.main.temp_max)}<sup>o</sup>`;
      lowTemp.innerHTML = `${Math.round(data.main.temp_min)}<sup>o</sup>`;
    })
    .catch(function (err) {
      console.warn("something is wrong.", err);
    });
}

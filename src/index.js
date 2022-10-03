let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${day} ${hours}:${minutes}`;

//week 5
let apiKey = "72b85c02ee24267c23e26e56f991d70b";

function searchCity(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let inputCity = document.querySelector("#search-text-input");
  h1.innerHTML = inputCity.value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&units=imperial&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("#search-city");
form.addEventListener("submit", searchCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let description = response.data.weather[0].description;
  let wind = Math.round(response.data.wind.speed) + "mph wind";
  console.log(response.data.name);
  console.log(response);

  let temperatureElement = document.querySelector("h2 #temp");
  temperatureElement.innerHTML = `${temperature}°`;

  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = `${city}`;

  let descriptionElement = document.querySelector("h4 #describe");
  descriptionElement.innerHTML = `${description}`;

  let windElement = document.querySelector("h4 #wind");
  windElement.innerHTML = `${wind}`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  form.reset();
}

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

//bonus week 5

let locateButton = document.querySelector("#location");
locateButton.addEventListener("click", getCurrentCity);

function getCurrentCity() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

function currentPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

//celcius
let celcius = document.querySelector("#celcius-link");
let fahrenheit = document.querySelector("#fahrenheit-link");
let changeTemp = document.querySelector("changeTemp");

function changeCelcius(event) {
  event.preventDefault();
  temp.innerHTML = "37";
}
function changeFahrenheit(event) {
  event.preventDefault();
  temp.innerHTML = "99";
}
celcius.addEventListener("click", changeCelcius);
fahrenheit.addEventListener("click", changeFahrenheit);

search("New York");

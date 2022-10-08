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
currentDate.innerHTML = `last updated: ${day} at ${hours}:${minutes}`;

let apiKey = "a710bd8bd76400c9658ef649d9e81728";

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  forecastHTML = `<div class="row g-0">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-12 col-md-2 col-lg-2">
          <div class="card">
            <img
              src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              class="card-img-top"
              alt="daily weather"
            />
            <div class="card-body">
              <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
              <p class="card-text">${Math.round(
                forecastDay.temp.max
              )}° / ${Math.round(forecastDay.temp.min)}°</p>
            </div>
          </div>
          </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getforecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed) + "mph wind";

  fahrenheit = Math.round(response.data.main.temp);

  let temperatureElement = document.querySelector("h2 #temp");
  temperatureElement.innerHTML = `${temperature}°`;

  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = `${city}`;

  let descriptionElement = document.querySelector("h4 #describe");
  descriptionElement.innerHTML = `${description} | `;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}% humidity | `;

  let windElement = document.querySelector("h4 #wind");
  windElement.innerHTML = `${wind}`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getforecast(response.data.coord);

  form.reset();
}

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

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

function getCurrentCity() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

function currentPosition(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}

let locateButton = document.querySelector("#location");
locateButton.addEventListener("click", getCurrentCity);

search("New York");

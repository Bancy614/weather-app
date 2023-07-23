let time = document.querySelector("#day");
setInterval(() => {
  let currentTime = new Date();
  let day = currentTime.toLocaleString("default", {
    weekday: "long",
  });
  let now = currentTime.toLocaleTimeString();

  time.innerHTML = `${day} ${now}`;
}, 1000);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search");
  let cityElement = document.querySelector("#city");
  if (searchInput.value) {
    searchCity(searchInput.value);
    cityElement.innerHTML = `${searchInput.value}`;
  } else {
    searchInput.innerHTML = null;
    alert("Please enter city name");
  }
}
let form = document.querySelector("#city-form");
form.addEventListener("submit", search);

let apiKey = "a4ba73c43b7f0b69291107044ef46ca6";

let searchInput = document.querySelector("#search");
let searchBtn = document.querySelector("#searchBtn");

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

function showTemperature(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = `${temperature}°C`;

  let descriptionElement = document.querySelector("#details");
  descriptionElement.innerHTML = response.data.weather[0].main;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity + " %";

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed + " Km/h";
}

function searchCity(city) {
  let apiKey = "a4ba73c43b7f0b69291107044ef46ca6";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}
// function handleSubmit(event) {
//   event.preventDefault();
//   let city = document.querySelector("#search").value;
//   searchCity(city);
// }
// searchCity(Nairobi);

function showCurrentPosition(position) {
  let apiKey = "a4ba73c43b7f0b69291107044ef46ca6";
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}
function getPosition() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}
let button = document.querySelector("#current");
button.addEventListener("click", getPosition);

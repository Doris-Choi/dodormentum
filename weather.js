const weather = document.querySelector('.js-weather');

// open weather map
const API_KEY = '540dd4f8aee12a5e89b80abb5c19889b';
const COORDS = 'coords';

async function getWeather(lat, lon) {
  const json = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  ).then((response) => response.json());
  console.log(json);
  const temperature = json.main.temp;
  const place = json.name;
  weather.innerText = `${temperature} ℃\n@ ${place}`;
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const coordsObj = {
    lat,
    lon,
  };
  saveCoords(coordsObj);
  getWeather(lat, lon);
}

function handleGeoError() {
  // default position
  const lat = 37.5;
  const lon = 127.0;
  const coordsObj = {
    lat,
    lon,
  };
  saveCoords(coordsObj);
  getWeather(lat, lon);
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.lat, parseCoords.lon);
  }
}

function init() {
  loadCoords();
}

init();

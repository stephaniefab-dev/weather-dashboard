const API_KEY="TU_API_KEY_AQUI";

const form = document.getElementById("search-form");
const input = document.getElementById("city-input");
const result = document.getElementById("result");
const errorMsg = document.getElementById("error");
 
const cityName = document.getElementById("city-name");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = input.value.trim();
  if (!city) return;
 
  await getWeather(city);
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric&lang=es`;
 
  try {
    const response = await fetch(url);
 
    if (!response.ok) {
      throw new Error("Ciudad no encontrada");
    }
 
    const data = await response.json();
    showResult(data);
  } catch (err) {
    showError();
  }
}

function showResult(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temp.textContent = `${Math.round(data.main.temp)}°C`;
  description.textContent = data.weather[0].description;
  feelsLike.textContent = `Sensación: ${Math.round(data.main.feels_like)}°C`;
  humidity.textContent = `Humedad: ${data.main.humidity}%`;
 
  result.classList.remove("hidden");
  errorMsg.classList.add("hidden");
}
 
function showError() {
  result.classList.add("hidden");
  errorMsg.classList.remove("hidden");
}
 
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const message = document.getElementById("message");
const weatherResult = document.getElementById("weatherResult");

const cityName = document.getElementById("cityName");
const weatherDescription = document.getElementById("weatherDescription");
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");

// OpenWeatherMap API Key
const apiKey = "YOUR_API_KEY_HERE";

async function getWeather(city) {
  message.textContent = "Loading weather data...";
  weatherResult.classList.add("hidden");

  const url = `[api.openweathermap.org](https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric)`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found or API request failed.");
    }

    const data = await response.json();

    displayWeather(data);
    message.textContent = "";
  } catch (error) {
    message.textContent = error.message;
    weatherResult.classList.add("hidden");
  }
}

function displayWeather(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  weatherDescription.textContent = data.weather[0].description;
  temperature.textContent = `${data.main.temp} °C`;
  feelsLike.textContent = `${data.main.feels_like} °C`;
  humidity.textContent = `${data.main.humidity}%`;
  windSpeed.textContent = `${data.wind.speed} m/s`;
  pressure.textContent = `${data.main.pressure} hPa`;
  visibility.textContent = `${data.visibility / 1000} km`;

  weatherResult.classList.remove("hidden");
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (city === "") {
    message.textContent = "Please enter a city name.";
    weatherResult.classList.add("hidden");
    return;
  }

  getWeather(city);
});

cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

const apiKey = "YOUR_API_KEY_HERE"; // Uzmi OpenWeatherMap API key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const weatherInfo = document.getElementById("weatherInfo");
const errorMsg = document.getElementById("errorMsg");

const cityNameEl = document.getElementById("cityName");
const descriptionEl = document.getElementById("description");
const tempEl = document.getElementById("temp");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");

searchBtn.addEventListener("click", fetchWeather);
cityInput.addEventListener("keypress", e => {
    if(e.key === "Enter") fetchWeather();
});

function fetchWeather() {
    const city = cityInput.value.trim();
    if (!city) return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
            if (data.cod !== 200) {
                showError();
                return;
            }
            showWeather(data);
        })
        .catch(showError);
}

function showWeather(data) {
    errorMsg.classList.add("hidden");
    weatherInfo.classList.remove("hidden");

    cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
    descriptionEl.textContent = data.weather[0].description;
    tempEl.textContent = Math.round(data.main.temp);
    humidityEl.textContent = data.main.humidity;
    windEl.textContent = data.wind.speed;
}

function showError() {
    weatherInfo.classList.add("hidden");
    errorMsg.classList.remove("hidden");
}

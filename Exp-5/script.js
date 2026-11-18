// Replace YOUR_API_KEY_HERE with your actual OpenWeatherMap API key
// Sign up at https://openweathermap.org/api to get a free API key
var apiKey = "YOUR_API_KEY_HERE";
var btn = document.getElementById("getWeatherBtn");
var cityInput = document.getElementById("cityInput");
var weatherResult = document.getElementById("weatherResult");
var errorDiv = document.getElementById("error");

btn.addEventListener("click", function () {
    var city = cityInput.value.trim();
    if (city === "") {
        showError("Please enter a city name.");
        return;
    }

    // Hide previous results and errors
    weatherResult.style.display = "none";
    errorDiv.style.display = "none";

    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";

    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(function (data) {
            document.getElementById("cityName").textContent = data.name + ", " + data.sys.country;
            document.getElementById("temperature").textContent = "Temperature: " + data.main.temp + " °C";
            document.getElementById("description").textContent = "Weather: " + data.weather[0].description;
            document.getElementById("humidity").textContent = "Humidity: " + data.main.humidity + "%";
            weatherResult.style.display = "block";
        })
        .catch(function (error) {
            showError("City not found. Please try again.");
        });
});

cityInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        btn.click();
    }
});

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
    weatherResult.style.display = "none";
}
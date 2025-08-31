import React from "react";
import axios from "axios";
import { useState } from "react";
import { DotLoader } from "react-spinners"; //importing the ClipLoader from react-spinners

const WeatherApp = () => {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const [error, setError] = useState(""); //error state to handle errors. Use an empty string

  const [isloading, setIsLoading] = useState(false); //loading state to handle loading state

  const fetchWeather = async () => {
    try {
      setError(""); //clear previous errors
      setIsLoading(true); //set loading to true when the fetch starts

      const API_KEY = "......."; //replace with your own API key from openweathermap.org

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      //axios takes care of converting the response to json.
      // response.json().then(function (data) -----> not needed
      console.log("Weather Data:", response.data);
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError(
        "Could not fetch weather data. Please check the city name and try again."
      );
      //   alert(
      //     "Could not fetch weather data. Please check the city name and try again."
      //   ); alert will block interactions with the app until dismissed.
    } finally {
      setIsLoading(false); //set loading to false when the fetch ends
    }
  };

  console.log(weatherData);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className="weather-app flex flex-col items-center justify-center min-h-screen bg-black/50 p-4">
      <div className="weather-container bg-white/80 p-6 rounded-lg shadow-md place-content-evenly w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">🌤️ Weather App</h1>

        <div className="flex gap-4">
          <input
            type="text"
            className="flex-1 border-red-400 border-2 p-2 rounded"
            placeholder="Enter City Name"
            onChange={(e) => setCityName(e.target.value)}
            value={cityName}
            onKeyDown={handleKeyPress}
          />

          <button
            className="cursor-pointer bg-blue-400 border-2 p-2 rounded hover:bg-red-500"
            onClick={fetchWeather}
          >
            {isloading ? "Loading..." : "Get Weather"}
          </button>
        </div>

        {/* //loader */}
        {isloading && (
          <div className="loader mt-4 flex justify-center items-center">
            <DotLoader color="black" />
          </div>
        )}

        {/* //error message display */}
        {error && (
          <div className="error-message text-red-500 text-sm mt-2">{error}</div>
        )}

        {/* //conditional rendering of weather data */}

        {weatherData && !isloading && !error && (
          <div className="weather-data text-black mt-4 text-center rounded-2xl bg-blue-400/80 p-4">
            <h3 className="text-xl text-black font-bold">
              {weatherData.name}, {weatherData.sys.country}
            </h3>
            <p className="text-black">
              Temperature: {weatherData.main.temp} °C
            </p>
            <p className="text-black">
              Humidity: {weatherData.main.humidity} %
            </p>
            <p className="text-black">
              Condition: {weatherData.weather[0].description}
            </p>
            <p className="text-black">
              Wind Speed: {weatherData.wind.speed} m/s
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;

import React, { useState, useEffect } from "react";
import WeatherCard from "../components/WeatherCard";
import withBackgroundColor from "../hoc/withBackground";
import fetchWeatherData from "../api/weatherApi";
import "../App.css";

const ColoredWeatherCard = withBackgroundColor(WeatherCard, "");
const defaultCities = ["London", "Tokyo", "Paris", "New York"];

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [debouncedCity, setDebouncedCity] = useState("");
  const [defaultWeatherData, setDefaultWeatherData] = useState([]);

  // displays the default cities
  useEffect(() => {
    const fetchDefaultCitiesWeather = async () => {
      const weatherdefault = defaultCities.map((city) =>
        fetchWeatherData(city)
      );
      try {
        const weatherResults = await Promise.all(weatherdefault);
        setDefaultWeatherData(weatherResults);
      } catch {
        setError("Cannot Fetch");
      }
    };

    fetchDefaultCitiesWeather();
  }, []);

  // debounce function to stop recurrent api calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCity(city);
    }, 1000);

    return () => clearTimeout(timer);
  }, [city]);

  // live search
  useEffect(() => {
    const fetchWeather = async () => {
      if (debouncedCity.trim() === "") {
        setWeatherData(null);
        setError(null);
        return;
      }

      try {
        const data = await fetchWeatherData(debouncedCity);
        setWeatherData(data);
        setError(null);
      } catch {
        setWeatherData(null);
        setError("Error: No City Found!");
      }
    };

    fetchWeather();
  }, [debouncedCity]);

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />

      {defaultWeatherData.length > 0 && city.trim() === "" && (
        <div>
          <div className="weather-grid">
            {defaultWeatherData.map((data, index) => (
              <ColoredWeatherCard key={index} weatherData={data} />
            ))}
          </div>
        </div>
      )}

      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
      <div className="Display-weather-container">
        {weatherData && <ColoredWeatherCard weatherData={weatherData} />}
      </div>
    </div>
  );
};

export default Weather;

import React, { useState, useEffect } from "react";
import WeatherCard from "../components/WeatherCard";
import withBackgroundColor from "../hoc/withBackground";
import fetchWeatherData from "../api/weatherApi";
import "../App.css";

const ColoredWeatherCard = withBackgroundColor(WeatherCard, ""); // HOC

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [debouncedCity, setDebouncedCity] = useState(""); 
//   const defaultCities = ["London", "Tokyo", "Paris", "New York"]

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCity(city); 
    }, 1000); 

    return () => clearTimeout(timer); 
  }, [city]);

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
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
      {weatherData && <ColoredWeatherCard weatherData={weatherData} />}
    </div>
  );
};

export default Weather;
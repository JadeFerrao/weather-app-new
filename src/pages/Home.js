import React, { useState } from "react";
import WeatherCard from "../components/WeatherCard";
import withBackgroundColor from "../hoc/withBackground";
import fetchWeatherData from "../api/weatherApi";
import "../App.css";

const ColoredWeatherCard = withBackgroundColor(WeatherCard, "");

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData(city)
      .then((data) => {
        setWeatherData(data);
        setError(null);
      })
      .catch(() => {
        setWeatherData(null);
        setError("Error: No City Found!");
      });
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
      {weatherData && <ColoredWeatherCard weatherData={weatherData} />}
    </div>
  );
};

export default Weather;
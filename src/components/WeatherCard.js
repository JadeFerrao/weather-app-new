import React from "react";
import '../App.css';


const WeatherCard = ({ weatherData }) => {
    const celsius = (weatherData.main.temp - 273.15).toFixed(2)

  return (
    <div className="weather-container">
      <h1 className="country-name">{weatherData.sys.country}</h1>
      <h3 className="city-name">{weatherData.name}</h3>
      <p className="weather-description">{weatherData.weather[0].description}</p>
      <p className="temperature">Temp: {celsius} C</p>
      <p className="visibility">Wind Speed: {weatherData.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherCard;
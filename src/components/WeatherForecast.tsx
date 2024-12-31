import React from "react";
import { ForecastResponse } from "../types/types";

interface WeatherForecastProps {
  forecastData: ForecastResponse;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecastData }) => {
  if (!forecastData || !forecastData.time || forecastData.time.length === 0) {
    return <p>Loading 5-Day forecast...</p>;
  }

  return (
    <div className="forecast-container">
      <h2>5-Day Weather Forecast</h2>
      <div className="weather-cards-container">
        {forecastData.time.map((date, index) => (
          <div className="weather-card" key={index}>
            <h3 className="card-date">{date}</h3>
            <p className="card-info">
              Max Temp: {forecastData.temperature_2m_max[index]} °C
            </p>
            <p className="card-info">
              Min Temp: {forecastData.temperature_2m_min[index]} °C
            </p>
            <p className="card-info">
              Precipitation: {forecastData.precipitation_sum[index]} mm
            </p>
            <p className="card-info">
              Wind Speed: {forecastData.windspeed_10m_max[index]} km/h
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;

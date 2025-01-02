import React from "react";
import { ForecastResponse } from "../types/types";

interface WeatherForecastProps {
  forecastData: ForecastResponse;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecastData }) => {
  if (!forecastData || !forecastData.time || forecastData.time.length === 0) {
    return <p>Loading the next few days...</p>;
  }

  return (
    <div className="forecast-container">
      <h2>Upcoming Weather</h2>
      <div className="weather-cards-container">
        {forecastData.time.map((date, index) => (
          <div className="weather-card" key={index}>
            <h3 className="card-date">{date}</h3>
            <p className="card-info">
              High: {forecastData.temperature_2m_max[index]}°C
            </p>
            <p className="card-info">
              Low: {forecastData.temperature_2m_min[index]}°C
            </p>
            <p className="card-info">
              Precipitation: {forecastData.precipitation_sum[index]} mm
            </p>
            <p className="card-info">
              Wind: {forecastData.windspeed_10m_max[index]} km/h
            </p>
            {forecastData.uv_index_max && (
              <p className="card-info">
                UV Index: {forecastData.uv_index_max[index]}
              </p>
            )}
            {forecastData.sunrise && (
              <p className="card-info">
                Sunrise: {forecastData.sunrise[index]}
              </p>
            )}
            {forecastData.sunset && (
              <p className="card-info">Sunset: {forecastData.sunset[index]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;

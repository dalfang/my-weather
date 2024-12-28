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
    <div>
      <h2>5-Day Weather Forecast</h2>
      {forecastData.time.map((date, index) => (
        <div key={index}>
          <h3>{date}</h3>
          <p>Max Temp: {forecastData.temperature_2m_max[index]} °C</p>
          <p>Min Temp: {forecastData.temperature_2m_min[index]} °C</p>
          <p>Precipitation: {forecastData.precipitation_sum[index]} mm</p>
          <p>Wind Speed: {forecastData.windspeed_10m_max[index]} km/h</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;

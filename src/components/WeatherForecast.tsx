import React from "react";
import { ForecastResponse } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureHigh,
  faTemperatureLow,
  faSun,
  faMoon,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

interface WeatherForecastProps {
  forecastData: ForecastResponse;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecastData }) => {
  if (!forecastData || !forecastData.time || forecastData.time.length === 0) {
    return <p>Loading the next few days...</p>;
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const formatTime = (timeString: string): string => {
    const time = new Date(timeString);
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(time);
  };

  return (
    <div className="forecast-container">
      <h2>Upcoming Weather</h2>
      <div className="weather-cards-container">
        {forecastData.time.slice(0, 4).map((date, index) => (
          <div className="weather-card" key={index}>
            <h3 className="card-date">{formatDate(date)}</h3>
            <p className="card-info">
              <FontAwesomeIcon icon={faTemperatureHigh} /> High:{" "}
              {forecastData.temperature_2m_max[index]}°C
            </p>
            <p className="card-info">
              <FontAwesomeIcon icon={faTemperatureLow} /> Low:{" "}
              {forecastData.temperature_2m_min[index]}°C
            </p>
            <p className="card-info">
              <FontAwesomeIcon icon={faWind} /> Wind:{" "}
              {forecastData.windspeed_10m_max[index]} km/h
            </p>
            {forecastData.uv_index_max && (
              <p className="card-info">
                UV Index: {forecastData.uv_index_max[index]}
              </p>
            )}
            {forecastData.sunrise && (
              <p className="card-info">
                <FontAwesomeIcon icon={faSun} /> Sunrise:{" "}
                {formatTime(forecastData.sunrise[index])}
              </p>
            )}
            {forecastData.sunset && (
              <p className="card-info">
                <FontAwesomeIcon icon={faMoon} /> Sunset:{" "}
                {formatTime(forecastData.sunset[index])}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default WeatherForecast;

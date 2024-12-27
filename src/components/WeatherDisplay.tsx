// src/components/WeatherDisplay.tsx

import React from "react";
import { WeatherResponse } from "../types/types";

interface WeatherDisplayProps {
  weatherData: WeatherResponse | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  const { current_weather } = weatherData;

  return (
    <div>
      <h2>Current Weather</h2>
      <p id="temperature">Temperature: {current_weather.temperature} °C</p>
      <p id="windspeed">Wind Speed: {current_weather.windspeed} km/h</p>
      <p id="winddirection">
        Wind Direction: {current_weather.winddirection} °
      </p>
    </div>
  );
};

export default WeatherDisplay;

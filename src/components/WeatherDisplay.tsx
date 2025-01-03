import React from "react";
import clearDayIcon from "../assets/icons/clear-day.svg";
import clearNightIcon from "../assets/icons/clear-night.svg";
import cloudyIcon from "../assets/icons/cloudy.svg";
import fogIcon from "../assets/icons/fog.svg";
import hurricaneIcon from "../assets/icons/hurricane.svg";
import partlyCloudyDayIcon from "../assets/icons/partly-cloudy-day.svg";
import partlyCloudyNightIcon from "../assets/icons/partly-cloudy-night.svg";
import rainIcon from "../assets/icons/rain.svg";
import snowIcon from "../assets/icons/snow.svg";
import thunderstormsRainIcon from "../assets/icons/thunderstorms-rain.svg";
import windIcon from "../assets/icons/wind.svg";
import drizzle from "../assets/icons/drizzle.svg";
import { WeatherResponse } from "../types/types";

interface WeatherDisplayProps {
  weatherData: WeatherResponse | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  const { current_weather } = weatherData;
  const { weathercode, is_day } = current_weather;

  // Convert weathercode to integer if it's a string
  const code =
    typeof weathercode === "string" ? parseInt(weathercode) : weathercode;

  let icon;

  // Map the weathercode to an icon based on is_day (day or night)
  switch (code) {
    case 0: // Clear sky
      icon = is_day ? clearDayIcon : clearNightIcon;
      break;
    case 1: // Mainly clear
      icon = is_day ? partlyCloudyDayIcon : partlyCloudyNightIcon;
      break;
    case 2: // Partly cloudy
      icon = is_day ? partlyCloudyDayIcon : partlyCloudyNightIcon;
      break;
    case 3: // Cloudy
      icon = cloudyIcon;
      break;
    case 45: // Fog
      icon = fogIcon;
      break;
    case 48: // Depositing rime fog
      icon = fogIcon;
      break;
    case 51: // Light rain
    case 53: // Moderate rain
    case 55: // Heavy rain
      icon = rainIcon;
      break;
    case 56: // Freezing rain
      icon = rainIcon;
      break;
    case 57: // Freezing drizzle
    case 61: // drizzle
      icon = drizzle;
      break;
    case 63: // Moderate snow
    case 65: // Heavy snow
      icon = snowIcon;
      break;
    case 71: // Light thunderstorm
    case 73: // Moderate thunderstorm
    case 75: // Heavy thunderstorm
      icon = thunderstormsRainIcon;
      break;
    case 77: // Thunderstorms with hail
      icon = thunderstormsRainIcon;
      break;
    case 80: // Light rain showers
    case 81: // Moderate rain showers
    case 82: // Heavy rain showers
      icon = rainIcon;
      break;
    case 85: // Light snow showers
    case 86: // Heavy snow showers
      icon = snowIcon;
      break;
    case 95: // Thunderstorms
      icon = thunderstormsRainIcon;
      break;
    case 96: // Thunderstorms with hail
    case 99: // Thunderstorms with hail
      icon = thunderstormsRainIcon;
      break;
    case 200: // Windy (hurricane-like)
    case 201: // Strong wind
    case 202: // Very strong wind
      icon = windIcon; // Use windIcon for windy weather
      break;
    case 203: // Hurricane
    case 204: // Severe hurricane
      icon = hurricaneIcon; // Use hurricaneIcon for hurricane conditions
      break;
    default:
      icon = clearDayIcon; // Default to clear day if no match
      break;
  }

  // Get today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="weather-display">
      <img src={icon} alt="Weather Icon" width={250} height={250} />
      <h3> {formattedDate}</h3>
      <p id="temperature">Temperature: {current_weather.temperature} °C</p>
      <p id="windspeed">Wind Speed: {current_weather.windspeed} km/h</p>
      <p id="winddirection">
        Wind Direction: {current_weather.winddirection} °
      </p>
    </div>
  );
};

export default WeatherDisplay;

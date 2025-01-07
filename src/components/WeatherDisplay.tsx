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

  const { current_weather, daily } = weatherData;
  const { temperature, weathercode, is_day, windspeed, winddirection } =
    current_weather;

  const code =
    typeof weathercode === "string" ? parseInt(weathercode) : weathercode;

  let icon;

  switch (code) {
    case 0:
      icon = is_day ? clearDayIcon : clearNightIcon;
      break;
    case 1:
    case 2:
      icon = is_day ? partlyCloudyDayIcon : partlyCloudyNightIcon;
      break;
    case 3:
      icon = cloudyIcon;
      break;
    case 45:
    case 48:
      icon = fogIcon;
      break;
    case 51:
    case 53:
    case 55:
    case 56:
      icon = rainIcon;
      break;
    case 57:
    case 61:
      icon = drizzle;
      break;
    case 63:
    case 65:
      icon = snowIcon;
      break;
    case 71:
    case 73:
    case 75:
    case 77:
    case 95:
    case 96:
    case 99:
      icon = thunderstormsRainIcon;
      break;
    case 200:
    case 201:
    case 202:
      icon = windIcon;
      break;
    case 203:
    case 204:
      icon = hurricaneIcon;
      break;
    default:
      icon = clearDayIcon;
      break;
  }

  const today = new Date();
  const formattedDate = today.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const hours = today.getHours();
  const isNight = hours >= 19 || hours < 5;

  const containerClass = isNight
    ? "weather-display night"
    : "weather-display day";

  const todayHigh = daily?.temperature_2m_max?.[0] ?? "N/A";
  const todayLow = daily?.temperature_2m_min?.[0] ?? "N/A";

  return (
    <div className={containerClass}>
      <h2>Today's Weather</h2>
      <img src={icon} alt="Weather Icon" width={250} height={250} />
      <h3>{formattedDate}</h3>
      <p id="temperature">Temperature: {temperature} °C</p>
      <p>High: {todayHigh} °C</p>
      <p>Low: {todayLow} °C</p>
      <p id="windspeed">Wind Speed: {windspeed} km/h</p>
      <p id="winddirection">Wind Direction: {winddirection}°</p>
    </div>
  );
};

export default WeatherDisplay;

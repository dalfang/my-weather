import axios from "axios";
import {
  WeatherResponse,
  LocationResponse,
  ForecastResponse,
  PartialLocation,
} from "../types/types";

// Define PartialLocation type

// Function to get location details
export const getLocation = async (
  location: string
): Promise<LocationResponse> => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=3`;
  const response = await axios.get(url);
  return response.data;
};

// Function to get current weather
export const getCurrentWeather = async (
  locationDetails: PartialLocation
): Promise<WeatherResponse> => {
  const { latitude, longitude } = locationDetails;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&models=icon_global`;

  try {
    const response = await axios.get(url);

    console.log("Current weather data:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to get 5-day weather forecast
export const getFiveDayForecast = async (
  locationDetails: PartialLocation
): Promise<ForecastResponse> => {
  const { latitude, longitude } = locationDetails;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&timezone=auto`;

  try {
    const response = await axios.get(url);
    const dailyData = response.data.daily;

    const forecastWithoutToday = {
      time: dailyData.time.slice(1),
      temperature_2m_max: dailyData.temperature_2m_max.slice(1),
      temperature_2m_min: dailyData.temperature_2m_min.slice(1),
      precipitation_sum: dailyData.precipitation_sum.slice(1),
      windspeed_10m_max: dailyData.windspeed_10m_max.slice(1),
    };

    return forecastWithoutToday;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to display location details
export const displayLocation = (locationDetails: PartialLocation) => {
  return locationDetails;
};

import axios from "axios";
import {
  WeatherResponse,
  Location,
  LocationResponse,
  ForecastResponse,
} from "../types/types";

// Function to get location details
export const getLocation = async (
  location: string
): Promise<LocationResponse> => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1`;
  const response = await axios.get(url);
  return response.data;
};

// Function to get current weather
export const getCurrentWeather = async (
  locationDetails: Location
): Promise<WeatherResponse> => {
  const { latitude, longitude } = locationDetails;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&models=icon_global`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Function to get 5-day weather forecast
export const getFiveDayForecast = async (
  locationDetails: Location
): Promise<ForecastResponse> => {
  const { latitude, longitude } = locationDetails;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&timezone=auto`;

  try {
    const response = await axios.get(url);
    return response.data.daily;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Function to display location details
export const displayLocation = (locationDetails: Location) => {
  return locationDetails;
};

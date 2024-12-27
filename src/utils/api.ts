import axios from "axios";
import { WeatherResponse, Location, LocationResponse } from "../types/types";

export const getLocation = async (
  location: string
): Promise<LocationResponse> => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1`;
  const response = await axios.get(url);
  return response.data;
};

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

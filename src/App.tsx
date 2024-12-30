import React, { useState, useEffect } from "react";
import {
  getLocation,
  getCurrentWeather,
  getFiveDayForecast,
} from "./utils/api";
import LocationDisplay from "./components/LocationDisplay";
import WeatherDisplay from "./components/WeatherDisplay";
import WeatherForecast from "./components/WeatherForecast";
import WeatherForm from "./components/WeatherFrom"; // i typo this..
import {
  LocationResponse,
  Location,
  WeatherResponse,
  ForecastResponse,
} from "./types/types";
import "./index.css";

const App: React.FC = () => {
  const [locationDetails, setLocationData] = useState<LocationResponse | null>(
    null
  );
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [forecastData, setForecastData] = useState<ForecastResponse | null>(
    null
  );

  const fetchWeatherData = async (
    location: Location | { latitude: number; longitude: number }
  ) => {
    try {
      const weatherResponse = await getCurrentWeather(location);
      console.log("here", weatherResponse);
      setWeatherData(weatherResponse);

      const forecastResponse = await getFiveDayForecast(location);
      setForecastData(forecastResponse);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = async (location: string) => {
    try {
      const locationResponse = await getLocation(location);
      setLocationData(locationResponse);

      if (locationResponse.results && locationResponse.results.length > 0) {
        const firstLocation: Location = locationResponse.results[0];
        fetchWeatherData(firstLocation);
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData({ latitude, longitude });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  return (
    <div className="App">
      <h1>hopefully, it won't rain today..</h1>
      <WeatherForm onSubmit={handleSearch} />
      {locationDetails &&
        locationDetails.results &&
        locationDetails.results.length > 0 && (
          <LocationDisplay locationDetails={locationDetails.results[0]} />
        )}
      {weatherData && <WeatherDisplay weatherData={weatherData} />}
      {forecastData && <WeatherForecast forecastData={forecastData} />}
    </div>
  );
};

export default App;

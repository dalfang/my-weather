import React, { useState, useEffect } from "react";
import {
  getLocation,
  getCurrentWeather,
  getFiveDayForecast,
  getLocationFromCoordinates,
} from "./utils/api";
import LocationDisplay from "./components/LocationDisplay";
import WeatherDisplay from "./components/WeatherDisplay";
import WeatherForecast from "./components/WeatherForecast";
import WeatherForm from "./components/WeatherFrom"; // i typo this
import Loader from "./components/Loader";
import {
  LocationResponse,
  Location,
  WeatherResponse,
  ForecastResponse,
  PartialLocation,
} from "./types/types";
import "./App.css";

const App: React.FC = () => {
  const [locationDetails, setLocationData] = useState<LocationResponse | null>(
    null
  );
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [forecastData, setForecastData] = useState<ForecastResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchWeatherData = async (location: PartialLocation) => {
    setIsLoading(true);
    try {
      const weatherResponse = await getCurrentWeather(location);
      setWeatherData(weatherResponse);

      const forecastResponse = await getFiveDayForecast(location);
      setForecastData(forecastResponse);

      // Fetch city and country name using latitude and longitude
      const { city, country } = await getLocationFromCoordinates(
        location.latitude,
        location.longitude
      );
      setLocationData({ city, country });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (location: string) => {
    setIsLoading(true);
    try {
      const locationResponse = await getLocation(location);
      setLocationData(locationResponse);

      if (locationResponse.results && locationResponse.results.length > 0) {
        const firstLocation: Location = locationResponse.results[0];
        fetchWeatherData(firstLocation);
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Fetch location details from geocoding API
        const locationResponse = await getLocation(`${latitude},${longitude}`);
        console.log("Location data:", locationResponse);
        setLocationData(locationResponse);

        // Fetch weather data based on coordinates
        fetchWeatherData({ latitude, longitude });
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return (
    <div className="App">
      <h1>hopefully, it won't rain today..</h1>
      <WeatherForm onSubmit={handleSearch} />
      {isLoading && <Loader />}

      {locationDetails && <LocationDisplay locationDetails={locationDetails} />}
      {weatherData && <WeatherDisplay weatherData={weatherData} />}
      {forecastData && <WeatherForecast forecastData={forecastData} />}
    </div>
  );
};
export default App;

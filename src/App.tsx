import React, { useState } from "react";
import {
  getLocation,
  getCurrentWeather,
  getFiveDayForecast,
} from "./utils/api";
import LocationDisplay from "./components/LocationDisplay";
import WeatherDisplay from "./components/WeatherDisplay";
import WeatherForecast from "./components/WeatherForecast";
import {
  LocationResponse,
  Location,
  WeatherResponse,
  ForecastResponse,
} from "./types/types";
import WeatherForm from "./components/WeatherFrom";

const App: React.FC = () => {
  const [locationDetails, setLocationData] = useState<LocationResponse | null>(
    null
  );
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [forecastData, setForecastData] = useState<ForecastResponse | null>(
    null
  ); // State for 5-day forecast

  const handleSearch = async (location: string) => {
    try {
      // Fetch location data
      const locationResponse = await getLocation(location);
      setLocationData(locationResponse);

      if (locationResponse.results && locationResponse.results.length > 0) {
        const firstLocation: Location = locationResponse.results[0];

        // Fetch current weather data
        const weatherResponse = await getCurrentWeather(firstLocation);

        setWeatherData(weatherResponse);

        // Fetch 5-day forecast data
        const forecastResponse = await getFiveDayForecast(firstLocation);
        console.log("here", forecastResponse);

        setForecastData(forecastResponse);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
      {forecastData && locationDetails && (
        <WeatherForecast forecastData={forecastData} />
      )}
    </div>
  );
};
export default App;

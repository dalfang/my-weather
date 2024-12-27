import React, { useState } from "react";
import { getLocation, getCurrentWeather } from "./utils/api";
import LocationDisplay from "./components/LocationDisplay";
import WeatherDisplay from "./components/WeatherDisplay";
import { LocationResponse, Location, WeatherResponse } from "./types/types";
import WeatherForm from "./components/WeatherFrom";

const App: React.FC = () => {
  const [locationDetails, setLocationData] = useState<LocationResponse | null>(
    null
  );
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);

  const handleSearch = async (location: string) => {
    try {
      const locationResponse = await getLocation(location);
      setLocationData(locationResponse);

      if (locationResponse.results && locationResponse.results.length > 0) {
        const firstLocation: Location = locationResponse.results[0];
        const weatherResponse = await getCurrentWeather(firstLocation);
        setWeatherData(weatherResponse);
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
    </div>
  );
};

export default App;

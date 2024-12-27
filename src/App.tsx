import React, { useState } from "react";
import { getLocation } from "./utils/api";
import LocationDisplay from "./components/LocationDisplay";
import { LocationResponse, Location } from "./types/types";
import WeatherForm from "./components/WeatherFrom";

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<LocationResponse | null>(null);

  const handleSearch = async (location: string) => {
    try {
      const data = await getLocation(location);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="App">
      <h1>hopefully, it won't rain today..</h1>
      <WeatherForm onSubmit={handleSearch} />
      {weatherData && weatherData.results && weatherData.results.length > 0 && (
        <LocationDisplay locationDetails={weatherData.results[0]} />
      )}
    </div>
  );
};

export default App;

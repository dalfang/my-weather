import React, { useState } from "react";
import { getLocation } from "../utils/api";

interface WeatherFormProps {
  onSubmit: (location: string) => void;
}

const WeatherForm: React.FC<WeatherFormProps> = ({ onSubmit }) => {
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchLocationSuggestions = async (query: string) => {
    try {
      const locationResponse = await getLocation(query);
      const newSuggestions = locationResponse.results
        .map((result) => `${result.name}, ${result.country}`)
        .filter(Boolean);
      setSuggestions(newSuggestions);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);

    if (value.length >= 3) {
      fetchLocationSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(location);
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setLocation(suggestion);
    setSuggestions([]);
    onSubmit(suggestion);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={location}
        onChange={handleChange}
        placeholder="Enter your location..."
        required
      />
      <span className="link-slide-up" onClick={() => onSubmit(location)}>
        Get Weather
      </span>
      {suggestions.length > 0 && (
        <div className="suggestions-container">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default WeatherForm;

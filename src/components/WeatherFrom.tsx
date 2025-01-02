import React, { useState } from "react";
import { getLocation } from "../utils/api";

interface WeatherFormProps {
  onSubmit: (location: string) => void;
}

const WeatherForm: React.FC<WeatherFormProps> = ({ onSubmit }) => {
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Function to handle fetching location suggestions
  const fetchLocationSuggestions = async (query: string) => {
    try {
      const locationResponse = await getLocation(query);
      const newSuggestions = locationResponse.results
        .map((result) => `${result.name}, ${result.country}`)
        .filter(Boolean); // Filters out undefined values
      setSuggestions(newSuggestions);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  // Handle input change and trigger fetching suggestions
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);

    if (value.length >= 3) {
      fetchLocationSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(location);
    setSuggestions([]);
  };

  // Handle click on a suggestion
  const handleSuggestionClick = (suggestion: string) => {
    setLocation(suggestion);
    setSuggestions([]);
    onSubmit(suggestion);
  };

  return (
    <form
      className="search-bar"
      onSubmit={handleSubmit}
      style={{ position: "relative", width: "100%" }}
    >
      <input
        type="text"
        value={location}
        onChange={handleChange}
        placeholder="Enter your location..."
        required
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "8px 16px",
          marginTop: "8px",
          textDecoration: "none",
          color: "#fff",
          backgroundColor: "#007bff",
          borderRadius: "4px",
          display: "inline-block",
        }}
        className="link-slide-up"
      >
        Get Weather
      </button>
      {suggestions.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            zIndex: 1,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #ccc",
              }}
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

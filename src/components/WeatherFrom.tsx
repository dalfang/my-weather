import React, { useState } from "react";

interface WeatherFormProps {
  onSubmit: (location: string) => void;
}

const WeatherForm: React.FC<WeatherFormProps> = ({ onSubmit }) => {
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(location);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter your location..."
        required
      />
      <button type="submit">Get Weather</button>
    </form>
  );
};

export default WeatherForm;

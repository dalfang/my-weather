// src/components/LocationDisplay.tsx

import React from "react";
import { Location } from "../types/types";

interface LocationDisplayProps {
  locationDetails: Location;
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({
  locationDetails,
}) => {
  return (
    <div id="location-container">
      <h2 id="location-name">{locationDetails.name}</h2>
      <h3 id="country">{locationDetails.country}</h3>
    </div>
  );
};

export default LocationDisplay;

import React from "react";

interface LocationDisplayProps {
  locationDetails: { city: string; country: string };
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({
  locationDetails,
}) => {
  return (
    <div id="location-container">
      <h2 className="location-name">
        {locationDetails.city}, {locationDetails.country}
      </h2>
    </div>
  );
};

export default LocationDisplay;

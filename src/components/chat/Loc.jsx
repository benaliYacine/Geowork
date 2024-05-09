import { Alert } from "@mui/material";
import React, { useState, useEffect } from "react";

const LocationComponent = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    };

    const handleError = (error) => {
      setError(`Geolocation error: ${error.message}`);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return (
    <div>
      <h1>User Location</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : location ? (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      ) : (
        <p>Requesting location...</p>
      )}
    </div>
  );
};

// export default LocationComponent;

export default function getUserLocation() {
  if (!navigator.geolocation) {
    Alert("Geolocation is not supported by your browser");
    return;
  }

  const handleSuccess = (position) => {
    console.log(position.coords);
    const userLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    return userLocation;
  };

  const handleError = (error) => {
    Alert(`Geolocation error: ${error.message}`);
  };

  navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}

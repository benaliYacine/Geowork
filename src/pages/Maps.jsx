import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Padding } from "@mui/icons-material";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
  Padding:"20px"
};
const center = {
  lat: 36.7538, // latitude for Algiers, Algeria
  lng: 3.0588, // longitude for Algiers, Algeria
};

const App = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAfuO7mnXJNvNVIYYMQVeChPu8KXIU49b8",
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div className="p-">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default App;

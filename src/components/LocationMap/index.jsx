import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const LocationMap = ({ location }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBnrxeygFgAORMmFmwr5BXTk05680RlY48",
  });

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div className="rounded-xl overflow-hidden">
      <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={15}
       options={{
          scrollwheel: false,
          gestureHandling: "cooperative",
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
        }}
      >
        <Marker position={location} />
      </GoogleMap>
    </div>
  );
};
export default LocationMap;

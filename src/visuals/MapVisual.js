import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue in Leaflet (React-specific workaround)
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapVisual = ( {locations} ) => {
  if(!locations || locations.length == 0){
    return <h1 className="text-center text-red-600 font-bold bg-slate-900">Not enought Data to Display Maps</h1>
  }else if(!locations.length){
    console.log(locations)
    return <h1 className="text-center text-red-600 font-bold bg-slate-900">Invalid data type given</h1>
  } 
 
  
  const indiaCoordinates = [20.5937, 78.9629];

  return (
    <MapContainer center={indiaCoordinates} zoom={3} style={{ height: "500px", width: "100%" }}>
      {/* Tile Layer (Map Background) */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Add Markers */}
      {
        locations
        ?.filter(item => item && item.lat !== null && item.lon !== null)
        ?.map((location, index) => (
          <Marker key={index} position={[location.lat || location.latitude , location.lon || location.longitude ]} icon={defaultIcon}>
            <Popup>
              {location.country}-{location.city} <br /> Lat: {location.lat || location.latitude } <br /> Long: {location.lon || location.longitude }
            </Popup>
          </Marker>
        ))
      }
    </MapContainer>
  );
};

export default MapVisual;

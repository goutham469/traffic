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

const locations = [
  { lat: 37.7749, lon: -122.4194, name: "San Francisco" },
  { lat: 40.7128, lon: -74.006, name: "New York" },
  { lat: 34.0522, lon: -118.2437, name: "Los Angeles" },
  { lat: 51.5074, lon: -0.1278, name: "London" },
  { lat: 48.8566, lon: 2.3522, name: "Paris" },
];

const MapVisualization = ( { locations } ) => {
  return (
    <MapContainer center={[37.7749, -122.4194]} zoom={3} style={{ height: "500px", width: "100%" }}>
      {/* Tile Layer (Map Background) */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Add Markers */}
      {locations.map((location, index) => (
        <Marker key={index} position={[location.lat, location.lon]} icon={defaultIcon}>
          <Popup>{location.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapVisualization;

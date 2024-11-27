import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapVisualization = ({ data }) => {
    if (!data || data.length === 0) {
        return <b>Not enough Data to show</b>;
    }

    return (
        <center>
            <MapContainer center={[0, 0]} zoom={2} style={{ height: '80vh', width: '60vw', border: "2px solid black" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                {data
                    .filter(item => item && item.lat !== null && item.lon !== null) // Filter out invalid data points
                    .map((item, index) => (
                        <Marker key={index} position={[item.lat || item.latitude , item.lon || item.latitude]}>
                            <Popup>
                                {item.country}-{item.city} <br /> Lat: {item.lat || item.latitude } <br /> Long: {item.lon || item.latitude }
                            </Popup>
                        </Marker>
                    ))
                }
            </MapContainer>
        </center>
    );
};

export default MapVisualization;

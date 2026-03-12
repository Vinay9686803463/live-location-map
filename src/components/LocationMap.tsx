import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const pulsingIcon = L.divIcon({
  className: "",
  html: `<div style="position:relative;width:20px;height:20px;">
    <div style="position:absolute;inset:0;border-radius:50%;background:hsl(217 91% 53%);opacity:0.3;animation:pulse-ring 1.5s ease-out infinite;"></div>
    <div style="position:absolute;inset:4px;border-radius:50%;background:hsl(217 91% 53%);border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>
  </div>
  <style>@keyframes pulse-ring{0%{transform:scale(1);opacity:0.4}100%{transform:scale(2.5);opacity:0}}</style>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

function MapUpdater({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  const firstRef = useRef(true);
  useEffect(() => {
    if (firstRef.current) {
      map.setView([lat, lng], 16);
      firstRef.current = false;
    } else {
      map.flyTo([lat, lng], map.getZoom(), { duration: 1 });
    }
  }, [lat, lng, map]);
  return null;
}

interface LocationMapProps {
  latitude: number;
  longitude: number;
  className?: string;
}

const LocationMap = ({ latitude, longitude, className }: LocationMapProps) => (
  <div className={className}>
    <MapContainer
      center={[latitude, longitude]}
      zoom={16}
      style={{ height: "100%", width: "100%", borderRadius: "var(--radius)" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]} icon={pulsingIcon}>
        <Popup>
          {latitude.toFixed(6)}, {longitude.toFixed(6)}
        </Popup>
      </Marker>
      <MapUpdater lat={latitude} lng={longitude} />
    </MapContainer>
  </div>
);

export default LocationMap;

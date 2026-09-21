import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function LocationMap({ latitude, longitude, area, country }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!latitude || !longitude) return;

    if (mapRef.current) {
      mapRef.current.remove();
    }

    const map = L.map("map").setView([latitude, longitude], 13);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.circle([latitude, longitude], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 500,
    })
      .addTo(map)
      .bindPopup(`<b>${area}</b><br />${country}`)
      .openPopup();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [latitude, longitude, area, country]);

  if (!latitude || !longitude) return null;

  return <MapContainer id="map"></MapContainer>;
}

const MapContainer = styled.div`
  height: 180px;
  width: 100%;
  margin: 1.5rem 0;
  border-radius: 8px;
  z-index: 1;
`;

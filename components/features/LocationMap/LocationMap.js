import { useEffect, useRef, useState } from "react";
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

export default function LocationMap({ area, country }) {
  const [coordinates, setCoordinates] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!area || !country) return;

    async function fetchCoordinates() {
      setIsLoading(true);

      try {
        const response = await fetch(
          `https://eu1.locationiq.com/v1/search?key=pk.a3162d2e937f4eb70c598f6e65f77f13&q=${area}, ${country}&format=json`
        );
        const data = await response.json();
        console.log("Nominatim Data:", data);
        if (data && data.length > 0) {
          setCoordinates({
            latitude: data[0].lat,
            longitude: data[0].lon,
          });
        } else {
          setCoordinates(null);
        }
      } catch (error) {
        console.error("message:", error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCoordinates();
  }, [area, country]);

  useEffect(() => {
    if (!coordinates) return;

    if (mapRef.current) {
      mapRef.current.remove();
    }

    const map = L.map("map").setView(
      [coordinates.latitude, coordinates.longitude],
      13
    );
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([coordinates.latitude, coordinates.longitude])
      .addTo(map)
      .bindPopup(`<b>${area}</b><br />${country}`)
      .openPopup();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [coordinates, area, country]);

  if (isLoading) return <p>Loading...</p>;
  if (!area || !country) return;
  if (!coordinates)
    return (
      <p>
        Didn't found location of {area}, {country}.
      </p>
    );

  return (
    <>
      <MapContainer id="map"></MapContainer>
    </>
  );
}

const MapContainer = styled.div`
  height: 180px;
  width: 100%;
  margin: 1.5rem 0;
  border-radius: 8px;
`;

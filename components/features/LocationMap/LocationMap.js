import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import { toast } from "react-toastify";

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
    if (!area || !country) {
      setCoordinates(null);
      return;
    }

    async function fetchCoordinates() {
      setIsLoading(true);

      try {
        const searchQuery = [area, country].filter(Boolean).join(", ");
        const response = await fetch(
          `https://eu1.locationiq.com/v1/search?key=${process.env.NEXT_PUBLIC_LOCATIONIQ_KEY}&q=${encodeURIComponent(searchQuery)}&format=json`
        );
        const data = await response.json();

        if (data && data.length > 0) {
          setCoordinates({
            latitude: parseFloat(data[0].lat),
            longitude: parseFloat(data[0].lon),
          });
        } else {
          setCoordinates(null);
          toast.error(`Could not find the location for ${area}, ${country}.`);
        }
      } catch (error) {
        console.error("message:", error.message);
        toast.error("Something went wrong while fetching the map.");
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

    L.circle([coordinates.latitude, coordinates.longitude], {
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
  }, [coordinates, area, country]);

  if (isLoading) return <MapContainer>Loading Map...</MapContainer>;
  if (!area || !country) return;

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

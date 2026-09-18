import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

export default function MapPage({ activities }) {
  const [leaflet, setLeaflet] = useState(null);

  const categoryColors = {
    Outdoor: "green",
    Sport: "blue",
    Water: "dodgerblue",
    Nature: "darkgreen",
    Adventure: "orange",
    Winter: "lightblue",
  };

  useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    setLeaflet(L);
  }, []);

  if (!leaflet) {
    return null;
  }

  const testActivities = [
    {
      _id: "1",
      title: "Wandern im Sauerland",
      categories: [{ _id: "a1", name: "Outdoor" }],
      coordinates: {
        lat: 51.4,
        lng: 8.05,
      },
      startDate: "2026-05-10",
    },
    {
      _id: "2",
      title: "Kajak auf der Ruhr",
      categories: [{ _id: "a2", name: "Water" }],
      coordinates: {
        lat: 51.45,
        lng: 7.0,
      },
      startDate: "2026-06-01",
    },
    {
      _id: "3",
      title: "Skitour Zugspitze",
      categories: [{ _id: "a3", name: "Winter" }],
      coordinates: {
        lat: 47.42,
        lng: 10.98,
      },
      startDate: "2026-01-15",
    },
    {
      _id: "4",
      title: "Ohne Koordinaten",
      categories: [{ _id: "a1", name: "Outdoor" }],
      coordinates: undefined,
      startDate: "2026-03-01",
    },
  ];

  return (
    <MapWrapper>
      <StyledTitle>Activities Map</StyledTitle>

      <MapContainer
        center={[50.5, 8.5]}
        zoom={6}
        style={{
          height: "500px",
          width: "300px",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {testActivities.map((activity) => {
          if (
            !activity.coordinates ||
            activity.coordinates.lat == null ||
            activity.coordinates.lng == null
          ) {
            return null;
          }

          const category = activity.categories?.[0]?.name;

          const markerColor = categoryColors[category] || "gray";

          const markerIcon = leaflet.divIcon({
            className: "custom-marker",
            html: `
              <div
                style="
                  width: 20px;
                  height: 20px;
                  background-color: ${markerColor};
                  border: 3px solid white;
                  border-radius: 50%;
                  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
                "
              ></div>
            `,
            iconSize: [26, 26],
            iconAnchor: [13, 13],
            popupAnchor: [0, -13],
          });

          return (
            <Marker
              key={activity._id}
              position={[activity.coordinates.lat, activity.coordinates.lng]}
              icon={markerIcon}
            >
              <Popup>
                <strong>{activity.title}</strong>
                <br />
                Kategorie: {category || "Keine Kategorie"}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </MapWrapper>
  );
}

const StyledTitle = styled.h2`
  text-align: center;
`;

const MapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

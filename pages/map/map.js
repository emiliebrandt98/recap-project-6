import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import Link from "next/link";

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

  return (
    <>
      <h1>Activities Map</h1>
      <MapWrapper>
        <MapContainer
          center={[50.5, 8.5]}
          zoom={6}
          style={{
            height: "500px",
            width: "320px",
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {(activities ?? []).map((activity) => {
            if (!activity) {
              return null;
            }

            if (activity.latitude == null || activity.longitude == null) {
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
                position={[activity.latitude, activity.longitude]}
                icon={markerIcon}
              >
                <Popup>
                  <Link href={`/activities/${activity._id}`}>
                    <strong>{activity.title}</strong>
                  </Link>
                  <br />
                  Kategorie: {category || "Keine Kategorie"}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </MapWrapper>
    </>
  );
}

const MapWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

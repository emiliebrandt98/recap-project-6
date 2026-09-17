import { useEffect, useState } from "react";

export default function LocationMap({ area, country }) {
  const [coordinates, setCoordinates] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  if (isLoading) return <p>Loading...</p>;
  if (!coordinates)
    return (
      <p>
        Didn't found location of {area}, {country}.
      </p>
    );

  return (
    <div>
      <p>Breitengrad (Latitude): {coordinates.latitude}</p>
      <p>Längengrad (Longitude): {coordinates.longitude}</p>
    </div>
  );
}

export async function getCoordinates(area, country) {
  const searchQuery = [area, country].filter(Boolean).join(", ");

  const response = await fetch(
    `https://eu1.locationiq.com/v1/search?key=${process.env.NEXT_PUBLIC_LOCATIONIQ_KEY}&q=${encodeURIComponent(searchQuery)}&format=json`
  );

  if (!response.ok) {
    toast.error("Error displaying location map.");
    return;
  }

  const data = await response.json();

  if (!data || data.length === 0) {
    return null;
  }

  return {
    latitude: parseFloat(data[0].lat),
    longitude: parseFloat(data[0].lon),
  };
}

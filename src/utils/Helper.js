export async function getLocationName(location) {
  if (
    !location ||
    !location.coordinates ||
    location.coordinates.length < 2 ||
    location.coordinates.some(c => c === null || c === undefined)
  ) {
    return "N/A";
  }

  try {
    const [latitude, longitude] = location.coordinates;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
    );

    if (!response.ok) throw new Error("Failed to fetch location data");

    const data = await response.json();

    const city =
      data.address.city ||
      data.address.town ||
      data.address.village ||
      data.address.county;
    const state = data.address.state;
    const country = data.address.country;

    return [city, state, country].filter(Boolean).join(", ") || "Unknown location";
  } catch (error) {
    console.error("Error fetching location:", error);
    return "N/A";
  }
}

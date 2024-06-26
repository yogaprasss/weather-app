export const getLocations = async (key) => {
  const url = import.meta.env.VITE_LOCATION_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const query = `?apikey=${apiKey}&q=${key}`;

  try {
    const response = await fetch(url + query);
    const result = await response.json();
    return result;
  } catch (e) {
    return false;
  }
};
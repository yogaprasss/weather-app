export const getCurrentWeather = async (locationKey) => {
  const url = import.meta.env.VITE_WEATHER_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const query = `/${locationKey}?apikey=${apiKey}&details=true`;

  try {
    const response = await fetch(url + query);
    const result = await response.json();
    return result;
  } catch (e) {
    return false;
  }
};
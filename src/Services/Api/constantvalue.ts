interface typeskey {
  GEOLOCATION_API_KEY: string;
  WEATHER_API_KEY: string;
}
interface typesurl {
  GEOLOCATION_API_URL: string;
  WEATHER_API_URL: string;
}
export const API_KEYS: typeskey = {
  GEOLOCATION_API_KEY: 'ba72c616258849d18b2bea955a2b32a3',
  WEATHER_API_KEY: '30dbf5fbfaa3fa2517f8ed20337f8437',
};
export const API_BASE_URLS: typesurl = {
  GEOLOCATION_API_URL: 'https://api.opencagedata.com/geocode/v1/json',
  WEATHER_API_URL: 'https://api.openweathermap.org/data/2.5/',
};

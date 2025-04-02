import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_URL = import.meta.env.VITE_GEOLOCATION_URL;
const API_KEY=import.meta.env.VITE_GEOLOCATION_API_KEY;

export const geoLocationApi = createApi({
  reducerPath: 'geoLocationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getGeolocationByCoords: builder.query({
      query: (query) => `?q=${query}&limit=50&key=${API_KEY}`,
    }),
  }),
});
export const { useGetGeolocationByCoordsQuery } = geoLocationApi;
 

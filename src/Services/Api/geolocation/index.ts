import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//const BASE_URL = import.meta.env.VITE_GEOLOCATION_URL;
//const API_KEY=import.meta.env.VITE_GEOLOCATION_API_KEY;

export const geoLocationApi = createApi({
  reducerPath: 'geoLocationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.opencagedata.com/geocode/v1/json",
  }),
  endpoints: (builder) => ({
    getGeolocationByCoords: builder.query({
      query: (query) => `?q=${query}&limit=50&key=ba72c616258849d18b2bea955a2b32a3`,
    }),
    getGeolocationByLatLng:builder.query({
       query: ({ lat, lng }) => `?q=${lat},${lng}&key=ba72c616258849d18b2bea955a2b32a3`
    })
  }),
});
export const { useGetGeolocationByCoordsQuery ,  useLazyGetGeolocationByCoordsQuery,useGetGeolocationByLatLngQuery,useLazyGetGeolocationByLatLngQuery} = geoLocationApi;
 
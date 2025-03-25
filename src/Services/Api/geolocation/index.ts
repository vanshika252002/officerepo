import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_KEYS, API_BASE_URLS } from '../constantvalue.ts';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URLS.GEOLOCATION_API_URL,
  }),
  endpoints: (builder) => ({
    getGeolocationByCoords: builder.query({
      query: (query) => `?q=${query}&key=${API_KEYS.GEOLOCATION_API_KEY}`,
    }),
  }),
});
export const { useGetGeolocationByCoordsQuery } = weatherApi;

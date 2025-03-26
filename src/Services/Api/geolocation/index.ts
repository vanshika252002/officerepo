import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_KEYS, API_BASE_URLS } from '../constantvalue.ts';

export const geoLocationApi = createApi({
  reducerPath: 'geoLocationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URLS.GEOLOCATION_API_URL,
  }),
  endpoints: (builder) => ({
    getGeolocationByCoords: builder.query({
      query: (query) => `?q=${query}&limit=200&page=10&key=ba72c616258849d18b2bea955a2b32a3`,
    }),
  }),
});
export const { useGetGeolocationByCoordsQuery } = geoLocationApi;

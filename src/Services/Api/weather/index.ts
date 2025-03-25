import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URLS, API_KEYS } from '../constantvalue';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URLS.WEATHER_API_URL,
  }),
  endpoints: (builder) => ({
    getWeatherByCoords: builder.query({
      query: ({ lat, lon }) =>
        `weather?lat=${lat}&lon=${lon}&appid=${API_KEYS.WEATHER_API_KEY}&units=metric`,
    }),
  }),
});
export const { useGetWeatherByCoordsQuery } = weatherApi;

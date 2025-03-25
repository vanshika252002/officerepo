import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = '1a29a46de4fbe4eb606e317064608b4a';  // Replace this with your new API key
const BASE_URL = 'https://api.aviationstack.com/v1';

export const liveflightApi = createApi({
  reducerPath: 'liveflightApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    
    getFlightsByRoute: builder.query({
      query: ({ originIata, destinationIata }) => 
        `flights?access_key=${API_KEY}&dep_iata=${originIata}&arr_iata=${destinationIata}`,
    }),


    getLiveFlightsByAirline: builder.query({
      query: (airlineIata) => `flights?access_key=${API_KEY}&airline_iata=${airlineIata}`,
    }),


    getAirportFlightHistory: builder.query({
      query: ({ iataCode, date }) => 
        `flights?access_key=${API_KEY}&airport_iata=${iataCode}&flight_date=${date}`,
    }),

 
    getAirportsByCountry: builder.query({
      query: (countryName) => `airports?access_key=${API_KEY}&country_name=${countryName}`,
    }),

    
    getNearbyFlightsOrAirports: builder.query({
      query: ({ latitude, longitude, radius = 50 }) => 
        `flights?access_key=${API_KEY}&lat=${latitude}&lon=${longitude}&radius=${radius}`,
    }),
  }),
});

export const { 
  useGetFlightsByRouteQuery,
  useGetLiveFlightsByAirlineQuery,
  useGetAirportFlightHistoryQuery,
  useGetAirportsByCountryQuery,
  useGetNearbyFlightsOrAirportsQuery
}=liveflightApi;

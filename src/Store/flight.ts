// store/flight.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FlightState {
  data: any[]; // Adjust the type as needed
}

const initialState: FlightState = {
  data: [],
};

const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    setFlights: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
    },
    clearFlights: (state) => {
      state.data = [];
    },
  },
});

export const { setFlights, clearFlights } = flightSlice.actions;
export default flightSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const common = createSlice({
  name: 'common',
  initialState: { token: null },
  reducers: {
    updateAuthTokenRedux: (state, action) => ({
      ...state,
      token: action.payload.token,
    }),
  },
});
console.log('common reducers ', common.reducer);

export const { updateAuthTokenRedux } = common.actions;

export default common.reducer;

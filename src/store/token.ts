import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

const tokenSlice = createSlice({
  name: 'token',
  initialState: '',
  reducers: {
    gen: () => {return Math.random().toString(16)},
    same: (state) => state,
    clear: () => '',
  },
});

export const tokenActions = tokenSlice.actions;

export const tokenSelectors = {
  get: (state: RootState): RootState['token'] => {
    console.log('tokenSelectors get');
    return state.token;
  },
};

export const token = tokenSlice.reducer;
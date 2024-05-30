import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

const tokenSlice = createSlice({
  name: 'token',
  initialState: localStorage.getItem('token') || '',
  reducers: {
    gen: () => {
      return Math.random().toString(16);
    },
    set: (state, action: PayloadAction<string>) => {
      localStorage.setItem('token', action.payload);
      return action.payload;
    },
    same: (state) => state,
    clear: () => '',
  },
});

export const tokenActions = tokenSlice.actions;

export const tokenSelectors = {
  get: (state: RootState): RootState['token'] => {
    return state.token;
  },
};

export const token = tokenSlice.reducer;

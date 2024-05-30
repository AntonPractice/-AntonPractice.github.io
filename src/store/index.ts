import { configureStore } from '@reduxjs/toolkit';
import { token } from './token';
import { cartProducts } from './cartProducts';
import { profile } from './profile';

export const store = configureStore({
  reducer: {
    token,
    cartProducts,
    profile,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

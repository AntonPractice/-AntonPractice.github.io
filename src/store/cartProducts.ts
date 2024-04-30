import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Products } from 'src/types';
import { RootState } from '.';



export const cartProductsSlice = createSlice({
  name: 'cartProducts',
  initialState: [] as Products,
  reducers: {
    set: (state, action: PayloadAction<{ id: string, name: string, image: string, price: number, description: string }>) => {
      state.push({
        id: action.payload.id,
        name: action.payload.name,
        image: action.payload.image,
        price: action.payload.price,
        description: action.payload.description
      }
      );
    },
    remove: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((x) => x.id !== action.payload.id)
    }
  },
})

export const cartProductsActions = cartProductsSlice.actions;


export const cartProductsSelectors = {
  get: (state: RootState): RootState['cartProducts'] => state.cartProducts,
};

export const cartProducts = cartProductsSlice.reducer





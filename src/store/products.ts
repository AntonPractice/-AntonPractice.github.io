import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Products } from 'src/types';
import { RootState } from '.';

const getInitialState = () => (
  [{
    image: 'https://img2.freepng.ru/20180806/siu/kisspng-laptop-asus-zenbook-3-intel-core-i5-cebrac-5b67cb65470759.909331961533528933291.jpg',
    price: 123456,
    name: 'Товар №1',
    id: 'ffwf4cf'
  },
  {
    image: 'https://express-china.ru/upload/iblock/f41/full_QsU2Pvti.jpg',
    price: 1000,
    name: 'Товар №2',
    id: '42rcewcfd',
    description: 'sdfsdfdsf'
  },
  {
    image: 'https://static.tildacdn.com/tild3063-3234-4263-b835-373962653933/mobile_2.jpg',
    price: 7777,
    name: 'Товар №3',
    id: '435cvewrfvsd',
    description: '/runtime~main.iframe.bundle.js'

  },
  {
    image: 'https://express-china.ru/upload/iblock/f41/full_QsU2Pvti.jpg',
    price: 888,
    name: 'Товар №4',
    id: '23rcfv'
  }]
)


export const productSlice = createSlice({
  name: 'products',
  initialState: getInitialState() as Products,
  reducers: {
    add: (state) => {
      state.push({
        id: new Date().toISOString(),
        name: 'Product_' + Math.random().toString(16).slice(-8),
        image: 'IMG_' + Math.random().toString(16).slice(-8),
        price: Math.floor(Math.random() * 10000),
        description: 'Description' + Math.random().toString(16).slice(-8)
      }
      );
    },
    addNew: (state, action: PayloadAction<{  name: string, image: string, price: number, description:string}>) => {
      state.push({
        id: new Date().toISOString(),
        name: action.payload.name,
        image: action.payload.image,
        price: action.payload.price,
        description:action.payload.description
      });
    },
    remove: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((x) => x.id !== action.payload.id)
    },
    edit: (state,action: PayloadAction<{ id: string, name: string, image: string, price: number, description:string}>) => {
      const index = state.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
          state[index] = action.payload;
      }
    }
  },
})




// Action creators are generated for each case reducer function
export const productActions = productSlice.actions;


export const productSelectors = {
  get: (state: RootState): RootState['products'] => state.products,
};

export const products = productSlice.reducer





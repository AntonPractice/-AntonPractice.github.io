import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.';
import { Profiles } from 'src/types';



export const profileSlice = createSlice({
  name: 'profile',
  initialState: [] as Profiles,
  reducers: {
    set: (state, action: PayloadAction<{ newName: string, password?: string, id?: string }>) => {
      state.push({
        id: action.payload.id ? action.payload.id : new Date().toISOString(),
        name: action.payload.newName,
        password: action.payload.password,
      }
      );
    },
    remove: () => {
      return []
    },
    edit: (state, action: PayloadAction<{ id: string, newName: string, password: string }>) => {
      const index = state.findIndex(profile => profile.id === action.payload.id);
      if (index !== -1) {
        state[index].name = action.payload.newName;
        state[index].password = action.payload.password;
      }
    }
  },
})

export const profileActions = profileSlice.actions;


export const profileSelectors = {
  get: (state: RootState): RootState['profile'] => state.profile,
};

export const profile = profileSlice.reducer





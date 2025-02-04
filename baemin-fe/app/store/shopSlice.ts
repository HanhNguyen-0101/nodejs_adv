import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shops: null,
  shop: null,
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    getAll: (state, action) => {
      state.shops = action.payload;
    },
    getOne: (state, action) => {
      state.shop = action.payload;
    }
  },
});

export const { getAll, getOne } = shopSlice.actions;
export default shopSlice.reducer;

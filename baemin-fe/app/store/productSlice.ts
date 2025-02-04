import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getAll: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { getAll } = productSlice.actions;
export default productSlice.reducer;

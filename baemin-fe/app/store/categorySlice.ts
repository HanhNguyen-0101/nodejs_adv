import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getAll: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { getAll } = categorySlice.actions;
export default categorySlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tags: null,
};

const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    getAll: (state, action) => {
      state.tags = action.payload;
    },
  },
});

export const { getAll } = tagSlice.actions;
export default tagSlice.reducer;

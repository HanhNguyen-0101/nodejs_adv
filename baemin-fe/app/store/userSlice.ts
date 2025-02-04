import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onSaveUser: (state, action) => {
      state.user = action.payload;
    },
    onClearUser: (state) => {
      state.user = null;
    }
  },
});

export const { onSaveUser, onClearUser } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  carts: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.carts.find(i => i.product_id === item.product_id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.carts.push({ ...item, quantity: item.quantity });
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.carts = state.carts.filter(item => item.product_id !== itemId);
    },
    clearCart: (state) => {
      state.carts = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

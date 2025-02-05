import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  carts: [],
  orders: {}
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
      const product = action.payload;
      state.carts = state.carts.filter(item => item.product_id !== product.product_id);
    },
    clearCart: (state) => {
      state.carts = [];
    },
    addOrder: (state, action) => {
      state.orders = action.payload;
    },
    clearOrder: (state) => {
      state.orders = {};
    }
  },
});

export const { addItem, removeItem, clearCart, addOrder, clearOrder } = cartSlice.actions;
export default cartSlice.reducer;

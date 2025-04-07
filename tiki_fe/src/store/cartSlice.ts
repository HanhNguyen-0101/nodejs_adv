import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  carts: [],
  orders: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.carts.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity = item.quantity;
        existingItem.coupon = item.coupon;
      } else {
        state.carts.push(item);
      }
    },
    removeItem: (state, action) => {
      const product = action.payload;
      state.carts = state.carts.filter((item) => item.id !== product.id);
    },
    clearCart: (state) => {
      state.carts = [];
    },
    addOrder: (state, action) => {
      state.orders = action.payload;
    },
    clearOrder: (state) => {
      state.orders = {};
    },
  },
});

export const { addItem, removeItem, clearCart, addOrder, clearOrder } =
  cartSlice.actions;
export default cartSlice.reducer;

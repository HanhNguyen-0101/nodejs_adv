// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './alertSlice';
import loadingReducer from './loadingSlice';
import userReducer from './userSlice';
import categoryReducer from './categorySlice';
import shopReducer from './shopSlice';
import productReducer from './productSlice';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    alert: alertReducer,
    loading: loadingReducer,
    user: userReducer,
    shop: shopReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

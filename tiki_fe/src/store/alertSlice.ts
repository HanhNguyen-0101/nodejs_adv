// store/alertSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  description?: string;
  visible: boolean;
}

const initialState: AlertState = {
  type: 'info',
  message: '',
  description: '',
  visible: false,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<Omit<AlertState, 'visible'>>) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.description = action.payload.description;
      state.visible = true;
    },
    hideAlert: (state) => {
      state.visible = false;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;

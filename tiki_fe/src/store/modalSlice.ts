// store/modalSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  isModalOpen: boolean;
  func?: any;
  template?: any;
}

const initialState: ModalState = {
  isModalOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.isModalOpen = true;
      if (action.payload?.func) {
        state.func = action.payload.func;
      } 
      if (action.payload?.template) {
        state.template = action.payload.template;
      }
    },
    hideModal: (state) => {
      state.isModalOpen = false;
      state.func = null;
      state.template = null;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;

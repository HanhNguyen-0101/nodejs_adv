// store/modalSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  isModalOpen: boolean;
  func?: any;
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
      if (action.payload) {
        state.func = action.payload;
      }
    },
    hideModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;

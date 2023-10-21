import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    openChat: (state) => {
      state.isOpen = true;
    },
    closeChat: (state) => {
      state.isOpen = false;
    }
  }
});

export const { openChat, closeChat } = formSlice.actions;
export default formSlice.reducer;
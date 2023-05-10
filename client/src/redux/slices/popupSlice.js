import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visibleEmail: true,
  visibleNumber: true,
  visiblePassword: true
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    changeEmail(state, actions) {
        state.visibleEmail = actions.payload
    },
    changeNumber(state, actions) {
        state.visibleNumber = actions.payload
    },
    changePassword(state, actions) {
        state.visiblePassword = actions.payload
    }
  }
});

export const { changeEmail, changeNumber, changePassword, } = popupSlice.actions;

export default popupSlice.reducer;
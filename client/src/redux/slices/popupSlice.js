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
    activeEmail(state, actions) {
        state.visibleEmail = actions.payload
    },
    activeNumber(state, actions) {
        state.visibleNumber = actions.payload
    },
    activePassword(state, actions) {
        state.visiblePassword = actions.payload
    }
  }
});

export const { activeEmail, activeNumber, activePassword } = popupSlice.actions;

export default popupSlice.reducer;
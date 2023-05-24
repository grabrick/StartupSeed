import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visibleEmail: true,
  visibleNumber: true,
  visiblePassword: true,
  visibleUTC: true
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
    },
    activeUTC(state, actions) {
      state.visibleUTC = actions.payload
  }
  }
});

export const { activeEmail, activeNumber, activePassword, activeUTC } = popupSlice.actions;

export default popupSlice.reducer;
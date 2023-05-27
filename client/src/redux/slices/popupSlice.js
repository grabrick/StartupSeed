import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visibleEmail: true,
  visibleNumber: true,
  visiblePassword: true,
  visibleUTC: true,
  visibleLogin: false,
  visibleRegister: false
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
    },
    activeLogin(state, actions) {
      state.visibleLogin = actions.payload
    },
    activeRegister(state, actions) {
      state.visibleRegister = actions.payload
    }
  }
});

export const {
  activeEmail,
  activeNumber,
  activePassword,
  activeUTC,
  activeLogin,
  activeRegister
} = popupSlice.actions;

export default popupSlice.reducer;
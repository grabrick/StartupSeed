import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visibleExp: true,
  visibleProf: true,
  visibleQual: true
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    changeExp(state, actions) {
        state.visibleExp = actions.payload
    },
    changeProf(state, actions) {
        state.visibleProf = actions.payload
    },
    changeQual(state, actions) {
        state.visibleQual = actions.payload
    }
  }
});

export const { changeExp, changeProf, changeQual, } = formSlice.actions;

export default formSlice.reducer;
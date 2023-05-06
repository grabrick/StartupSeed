import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  professional: []
};

const professionalSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    getPerson(state, actions) {
        state.professional = actions.payload
    }
  }
})

export const { getPerson } = professionalSlice.actions;

export default professionalSlice.reducer;
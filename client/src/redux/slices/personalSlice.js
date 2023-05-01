import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  person: []
};

const personalSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    getPerson(state, actions) {
        state.person = actions.payload
    }
  }
})

export const { getPerson } = personalSlice.actions;

export default personalSlice.reducer;
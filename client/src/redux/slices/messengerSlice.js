import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catalog: [],
  dialog: []
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    newMessage(state, actions) {
        const { value, userID } = actions.payload
        console.log(value, userID);
    },
    getCatalog(state, actions) {
      state.catalog = actions.payload
    }
  }
});

export const { newMessage, getCatalog } = formSlice.actions;

export default formSlice.reducer;
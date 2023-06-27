import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dialog: []
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    newMessage(state, actions) {
        const { value, userID } = actions.payload
        console.log(value, userID);
    }
  }
});

export const { changeExp, changeProf, changeQual, } = formSlice.actions;

export default formSlice.reducer;
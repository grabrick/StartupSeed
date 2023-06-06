import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  myProject: []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser(state, actions) {
      state.user = actions.payload
    },
    getProject(state, actions) {
      state.user = actions.payload
    }
  }
})

export const { getUser, getProject } = userSlice.actions;

export default userSlice.reducer;
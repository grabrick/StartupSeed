import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  skills: []
};

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    getSkills(state, actions) {
      state.skills = actions.payload
    },
    addTag(state, actions) {
      state.skills.push(...actions.payload)
    },
    removeTag(state, actions) {
      state.skills = state.skills.filter((el, i) => i !== actions.payload);
    }
  }
})

export const { getSkills, addTag, removeTag } = skillsSlice.actions;

export default skillsSlice.reducer;
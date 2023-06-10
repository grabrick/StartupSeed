import { createSlice } from "@reduxjs/toolkit";
import { getUUID } from '../../assets/utils/getUUID';

const initialState = {
  projectSkills: []
};

const projectSkillsSlice = createSlice({
  name: "projectSkills",
  initialState,
  reducers: {
    // getSkills(state, actions) {
    //   state.projectSkills = actions.payload
    // },
    // addTag(state, actions) {
    //   state.projectSkills.push(...actions.payload)
    // },
    // removeTag(state, actions) {
    //   state.projectSkills = state.projectSkills.filter((el, i) => i !== actions.payload);
    // }

    getSkills(state, actions) {
      state.projectSkills = actions.payload;
    },
    addTag(state, actions) {
      state.projectSkills.push({id: getUUID(), skills: actions.payload})
    },
    removeTag(state, actions) {
      const { formId, index } = actions.payload;
      if (state.projectSkills[formId]) {
        state.projectSkills[formId] = state.projectSkills[formId].filter((el, i) => i !== index);
      }
    }
  }
})

export const { getSkills, addTag, removeTag } = projectSkillsSlice.actions;

export default projectSkillsSlice.reducer;
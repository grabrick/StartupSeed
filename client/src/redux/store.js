import { configureStore } from "@reduxjs/toolkit";
import form from "./slices/formSlice"
import users from "./slices/userSlice";
import popup from "./slices/popupSlice"
import skills from "./slices/skillsSlice"
import project from "./slices/projectSkillsSlice"

export const store = configureStore({
  reducer: {
    form,
    popup,
    skills,
    project,
    users,
  },
})
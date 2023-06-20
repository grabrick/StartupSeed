import { configureStore } from "@reduxjs/toolkit";
import form from "./slices/formSlice"
import users from "./slices/userSlice";
import popup from "./slices/popupSlice"
import skills from "./slices/skillsSlice"
import createProject from "./slices/createProjectSlice"

export const store = configureStore({
  reducer: {
    form,
    popup,
    skills,
    createProject,
    users,
  },
})
import { configureStore } from "@reduxjs/toolkit";
import form from "./slices/formSlice"
import users from "./slices/userSlice";
import popup from "./slices/popupSlice"
import skills from "./slices/skillsSlice"

export const store = configureStore({
  reducer: {
    form,
    popup,
    skills,
    users,
  },
})
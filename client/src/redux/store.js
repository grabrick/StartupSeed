import { configureStore } from "@reduxjs/toolkit";
import form from "./slices/formSlice"
import users from "./slices/userSlice";
import popup from "./slices/popupSlice"


export const store = configureStore({
  reducer: {
    form,
    popup,
    users,
  },
});
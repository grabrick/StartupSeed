import { configureStore } from "@reduxjs/toolkit";
import form from "./slices/formSlice"
import users from "./slices/userSlice";


export const store = configureStore({
  reducer: {
    form,
    users,
  },
});
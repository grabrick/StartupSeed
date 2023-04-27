import { configureStore } from "@reduxjs/toolkit";
import form from "./slices/formSlice"


export const store = configureStore({
  reducer: {
    form
  },
});
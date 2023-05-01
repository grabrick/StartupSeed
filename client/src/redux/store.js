import { configureStore } from "@reduxjs/toolkit";
import form from "./slices/formSlice"
import personal from "./slices/personalSlice";


export const store = configureStore({
  reducer: {
    form,
    personal
  },
});
import { configureStore } from "@reduxjs/toolkit";
import form from "./slices/formSlice"
import users from "./slices/userSlice";
import popup from "./slices/popupSlice"
import skills from "./slices/skillsSlice"
import createProject from "./slices/createProjectSlice"
import pagination from "./slices/paginationSlice"
import currentUser from "./slices/currentUser";
import currentProject from "./slices/currentProjectSlice";
import messenger from "./slices/messengerSlice"
import usersThunks from "./thunk/userSlice"
import projectThunks from "./thunk/projectSlice"
import chatCatalog from "./thunk/chatCatalog"

export const store = configureStore({
  reducer: {
    form,
    popup,
    skills,
    createProject,
    users,
    pagination,
    currentUser,
    currentProject,
    messenger,
    
    // Thanks
    usersThunks,
    projectThunks,
    chatCatalog
  },
})
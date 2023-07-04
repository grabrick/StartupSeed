import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentProject: []
}

const currentProject = createSlice({
    name: "project",
    initialState,
    reducers: {
        getCurrentProject(state, actions) {
            state.currentProject = actions.payload
        }
    },
})


export const { getCurrentProject } = currentProject.actions;
export default currentProject.reducer;
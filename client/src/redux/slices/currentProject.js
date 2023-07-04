import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentProject: [],
    isFavorite: false
}

const currentProject = createSlice({
    name: "project",
    initialState,
    reducers: {
        getCurrentProject(state, actions) {
            state.currentProject = actions.payload
        },

        addFavorites(state, actions) {
            state.isFavorite = actions.payload
        }
    },
})


export const { getCurrentProject, addFavorites } = currentProject.actions;
export default currentProject.reducer;
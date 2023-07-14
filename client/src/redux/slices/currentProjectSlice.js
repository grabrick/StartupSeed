import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentProject: [],
    favoritesProject: [],
}

const currentProjectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        getCurrentProject(state, actions) {
            state.currentProject = actions.payload
        },

        getFavorite(state, actions) {
            state.favoritesProject = actions.payload
        },

        addFavoritesProject(state, actions) {
            const { value } = actions.payload
            state.favoritesProject.push({
                postID: value.postID,
                projectID: value.projectID,
                projectName: value.projectName,
                jobPost: value.jobPost,
                postLevel: value.postLevel,
                profilePic: value.profilePic,
                isFavorite: value.isFavorite
            })
        },

        removeProjectFavorite(state, actions) {
            const value = actions.payload

            state.favoritesProject = state.favoritesProject.filter(
                (user) => user.projectID !== value.projectID
            );
        },
    },
})


export const {
    getCurrentProject,
    addFavoritesProject,
    getFavorite,
    removeProjectFavorite,
} = currentProjectSlice.actions;
export default currentProjectSlice.reducer;
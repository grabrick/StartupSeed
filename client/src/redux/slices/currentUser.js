import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: [],
    favoritesUser: [],
}

const currentUser = createSlice({
    name: "cureentUser",
    initialState,
    reducers: {
        getUser(state, actions) {
            state.currentUser = actions.payload
        },

        getFavorite(state, actions) {
            state.favoritesUser = actions.payload
        },

        addFavoritesUser(state, actions) {
            const value = actions.payload
            state.favoritesUser.push({
                userID: value.userID,
                fname: value.fname,
                lname: value.lname,
                post: value.post,
                postLevel: value.postLevel,
                profilePic: value.profilePic,
                isFavorite: value.isFavorite,
            })
        },

        removeUserFavorite(state, actions) {
            const value = actions.payload

            state.favoritesUser = state.favoritesUser.filter(
                (user) => user.userID !== value.userID
            );
        },
    },
})


export const { getUser, getFavorite, addFavoritesUser, removeUserFavorite } = currentUser.actions;
export default currentUser.reducer;
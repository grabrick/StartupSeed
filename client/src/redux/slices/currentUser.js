import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: [],
    isFavorite: false
}

const currentUser = createSlice({
    name: "cureentUser",
    initialState,
    reducers: {
        getUser(state, actions) {
            state.currentUser = actions.payload
        },

        addFavorites(state, actions) {
            state.isFavorite = actions.payload
        }
    },
})


export const { getUser, addFavorites } = currentUser.actions;
export default currentUser.reducer;
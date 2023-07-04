import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: [],
}

const currentUser = createSlice({
    name: "cureentUser",
    initialState,
    reducers: {
        getUser(state, actions) {
            state.currentUser = actions.payload
        },
    },
})


export const { getUser } = currentUser.actions;
export default currentUser.reducer;
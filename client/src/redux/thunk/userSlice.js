import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../components/utils/config.json'

// Замените BASE_URL на адрес вашего API
const BASE_URL = config.BASE_URL;


export const fetchUsersData = createAsyncThunk('api/fetchData/user', async (endpoint) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data.');
        }
        return await response.json();
    } catch (error) {
        throw new Error('Failed to fetch data.');
    }
});

const initialState = {
    userData: null,
    userLoading: false,
    userError: null,
    reserveUsers: [],
};

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        searchResult: (state, action) => {
            const query = action.payload.toLowerCase();
            const filteredUsers = state.reserveUsers.data.filter((user) =>
                `${user.fname} ${user.lname}`.toLowerCase().indexOf(query) !== -1
            );
            state.userData.data = filteredUsers;

            if (query.length === 0) {
                state.userData.data = state.reserveUsers.data;
            }
        },
        setClearData: (state, action) => {
            state.userData = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersData.pending, (state) => {
                state.userLoading = true;
                state.userError = null;
            })
            .addCase(fetchUsersData.fulfilled, (state, action) => {
                state.userLoading = false;
                state.userData = action.payload;
                state.reserveUsers = action.payload
            })
            .addCase(fetchUsersData.rejected, (state, action) => {
                state.userLoading = false;
                state.userError = action.error.message;
            });
    },
});

export const { searchResult, setClearData } = userSlice.actions
export default userSlice.reducer;
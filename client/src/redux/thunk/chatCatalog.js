import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../components/utils/config.json'

// Замените BASE_URL на адрес вашего API
const BASE_URL = config.BASE_URL;


export const fetchCatalogData = createAsyncThunk('api/fetchData/catalogUser', async (endpoint) => {
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
    catalogData: null,
    catalogLoading: false,
    catalogError: null,
    reserveCatalog: [],
};

const catalogUserSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        searchResult: (state, action) => {
            const query = action.payload.toLowerCase();
            const filteredUsers = state.reserveCatalog.data.filter((user) =>
                `${user.fname} ${user.lname}`.toLowerCase().indexOf(query) !== -1
            );
            state.catalogData.data = filteredUsers;

            if (query.length === 0) {
                state.catalogData.data = state.reserveCatalog.data;
            }
        },
        setClearData: (state, action) => {
            state.catalogData = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCatalogData.pending, (state) => {
                state.catalogLoading = true;
                state.catalogError = null;
            })
            .addCase(fetchCatalogData.fulfilled, (state, action) => {
                state.catalogLoading = false;
                state.catalogData = action.payload;
                state.reserveCatalog = action.payload
            })
            .addCase(fetchCatalogData.rejected, (state, action) => {
                state.catalogLoading = false;
                state.catalogError = action.error.message;
            });
    },
});

export const { searchResult, setClearData } = catalogUserSlice.actions
export default catalogUserSlice.reducer;
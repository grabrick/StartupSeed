import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../components/utils/config.json'

// Замените BASE_URL на адрес вашего API
const BASE_URL = config.BASE_URL;


export const fetchProjectData = createAsyncThunk('api/fetchData/project', async (endpoint) => {
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
    projectData: null,
    projectLoading: false,
    projectError: null,
    reserveProject: [],
};

const userSlice = createSlice({
    name: 'projectSlice',
    initialState,
    reducers: {
        searchProjectResult: (state, action) => {
            const query = action.payload.toLowerCase();
            const filteredProject = state.reserveProject.data.filter((project) =>
                `${project.projectName}`.toLowerCase().indexOf(query) !== -1
            );
            // console.log(filteredProject);
            state.projectData.data = filteredProject;

            if (query.length === 0) {
                state.projectData.data = state.reserveProject.data;
            }
        },
        setProjectClearData: (state, action) => {
            state.projectData = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjectData.pending, (state) => {
                state.projectLoading = true;
                state.projectError = null;
            })
            .addCase(fetchProjectData.fulfilled, (state, action) => {
                state.projectLoading = false;
                state.projectData = action.payload;
                state.reserveProject = action.payload
            })
            .addCase(fetchProjectData.rejected, (state, action) => {
                state.projectLoading = false;
                state.projectError = action.error.message;
            });
    },
});

export const { searchProjectResult, setProjectClearData } = userSlice.actions
export default userSlice.reducer;
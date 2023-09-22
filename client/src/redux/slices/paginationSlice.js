import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  usersPerPage: 10,
  isFetching: true,
  reserveUsers: [],
  users: [],
  reserveProject: [],
  project: [],
  totalPages: 0,
  searchQuery: '',
};

const pagination = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    getUsers: (state, action) => {
      state.users = action.payload;
      state.reserveUsers = action.payload
    },
    getProject: (state, action) => {
      state.project = action.payload;
      state.reserveProject = action.payload
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setIsFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    setSearchQuery: (state, action) => {
      const { filtered, input, postLevel } = action.payload
      if (input || postLevel !== 'Любой') {
        state.users = filtered
      } else if (input === "" || postLevel === 'Любой') {
        state.users = state.reserveUsers
      }
    },
    setSearchProjectQuery: (state, action) => {
      const { filtered, input, postLevel } = action.payload
      if (input || postLevel !== 'Любой') {
        state.project = filtered
      } else if (input === "" || postLevel === 'Любой') {
        state.project = state.reserveProject
      }
    },
    setReserveUsers: (state, action) => {
      state.reserveUsers = action.payload
    },
    setReserveProject: (state, action) => {
      state.reserveUsers = action.payload
    },
    searchResult: (state, action) => {
      const query = action.payload.toLowerCase();
      const filteredUsers = state.reserveUsers.filter((user) =>
        `${user.fname} ${user.lname}`.toLowerCase().indexOf(query) !== -1
      );
      state.users = filteredUsers;
      
      if (query.length === 0) {
        state.users = state.reserveUsers;
      }
    },
  },
});

export const {
  setCurrentPage,
  getUsers,
  setReserveUsers,
  getProject,
  setReserveProject,
  setTotalPages,
  setIsFetching,
  setSearchQuery,
  setSearchProjectQuery,
  searchResult } = pagination.actions;

export default pagination.reducer;
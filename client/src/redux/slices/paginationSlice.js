import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage: 1,
    usersPerPage: 10,
    isFetching: true,
    reserveUsers: [],
    users: [],
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
      setTotalPages: (state, action) => {
        state.totalPages = action.payload;
      },
      setIsFetching: (state, action) => {
        state.isFetching = action.payload;
      },
      setSearchQuery: (state, action) => {
        const { filtered, input, postLevel } = action.payload
        console.log({ filtered, input, postLevel });
        if (input || postLevel !== 'Любой') {
          state.users = filtered
        } else if (input === "" || postLevel === 'Любой') {
          state.users = state.reserveUsers
        }
      },
      setReserveUsers: (state, action) => {
        state.reserveUsers = action.payload
      }
    },
  });

export const { setCurrentPage, getUsers, setReserveUsers, setTotalPages, setIsFetching, setSearchQuery } = pagination.actions;

export default pagination.reducer;
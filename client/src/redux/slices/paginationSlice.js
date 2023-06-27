import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage: 1,
    usersPerPage: 10,
    isFetching: true,
    users: [],
    totalPages: 0,
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
      },
      setTotalPages: (state, action) => {
        state.totalPages = action.payload;
      },
      setIsFetching: (state, action) => {
        state.isFetching = action.payload;
      },
    },
  });

export const { setCurrentPage, getUsers, setTotalPages, setIsFetching } = pagination.actions;

export default pagination.reducer;
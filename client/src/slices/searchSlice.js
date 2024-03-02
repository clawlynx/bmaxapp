import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  searchOn: false,
  totalPage: 1,
  name: "",
  branch: "ALL",
  course: "ALL",
  department: "ALL",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    setTotalPages: (state, { payload }) => {
      state.totalPage = payload;
    },
    setName: (state, { payload }) => {
      state.name = payload;
    },
    setBranch: (state, { payload }) => {
      state.branch = payload;
    },
    setCourse: (state, { payload }) => {
      state.course = payload;
    },
    setDepartment: (state, { payload }) => {
      state.department = payload;
    },
    setSearchOn: (state) => {
      state.searchOn = true;
    },
    setSearchOff: (state) => {
      state.searchOn = false;
    },
  },
});

export default searchSlice.reducer;
export const {
  setCurrentPage,
  setTotalPages,
  setBranch,
  setCourse,
  setName,
  setSearchOn,
  setSearchOff,
  setDepartment,
} = searchSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSidebar: true,
  userInfo: null,
  announcements: [
    {
      id: 1,
      title: "IELTS EXAM DATE NOV",
      date: "12-9-23",
      description:
        "The IELTS exam date for the month of november has been announced. students willing to participate please contact their respective branch manager",
    },
    {
      id: 2,
      title: "CMT date is here",
      date: "12-8-23",
      description:
        "the centralised mock test for the month of september has been announced for OEt. the eligible candidates please discuss the matter with respective teachers and inform the branch",
    },
  ],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    setUser: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
});

export default userSlice.reducer;
export const { toggleSidebar, setUser } = userSlice.actions;

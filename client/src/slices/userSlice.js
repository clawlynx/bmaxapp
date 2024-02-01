import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSidebar: true,
  userInfo: null,
  announcements: [],
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

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { apiSlice } from "./slices/apiSlice";
import searchReducer from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

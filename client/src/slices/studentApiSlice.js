import { STUDENT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getScoreStats: builder.query({
      query: () => ({
        url: `${STUDENT_URL}/scorestats`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetScoreStatsQuery } = studentApiSlice;

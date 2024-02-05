import { TUTOR_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const teacherApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUnassigned: builder.query({
      query: () => ({
        url: `${TUTOR_URL}/unassigned`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetUnassignedQuery } = teacherApiSlice;

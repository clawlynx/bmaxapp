import { ADMIN_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/summary`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetSummaryQuery } = adminApiSlice;

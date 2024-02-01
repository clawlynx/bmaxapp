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
    getAllTeachers: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/allteachers`,
      }),
      keepUnusedDataFor: 5,
    }),
    getAllStudents: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/allstudents`,
      }),
      keepUnusedDataFor: 5,
    }),
    getAllPendingVerification: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/verification`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetSummaryQuery,
  useGetAllTeachersQuery,
  useGetAllStudentsQuery,
  useGetAllPendingVerificationQuery,
} = adminApiSlice;

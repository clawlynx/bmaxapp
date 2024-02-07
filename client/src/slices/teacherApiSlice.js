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
    addStudent: builder.mutation({
      query: (studentId) => ({
        url: `${TUTOR_URL}/assign/${studentId}`,
        method: "PATCH",
      }),
    }),
    getCurrentStudents: builder.query({
      query: () => ({
        url: `${TUTOR_URL}/current`,
      }),
      keepUnusedDataFor: 5,
    }),
    evaluateStudent: builder.mutation({
      query: (data) => ({
        url: `${TUTOR_URL}/evaluate/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUnassignedQuery,
  useAddStudentMutation,
  useGetCurrentStudentsQuery,
  useEvaluateStudentMutation,
} = teacherApiSlice;

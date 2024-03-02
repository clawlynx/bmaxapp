import { TUTOR_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const teacherApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    completeStudent: builder.mutation({
      query: (studentId) => ({
        url: `${TUTOR_URL}/complete/${studentId}`,
        method: "PATCH",
      }),
    }),
    getCurrentStudents: builder.query({
      query: () => ({
        url: `${TUTOR_URL}/current`,
      }),
      keepUnusedDataFor: 5,
    }),
    getCompletedStudents: builder.query({
      query: () => ({
        url: `${TUTOR_URL}/finished`,
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
  useGetCurrentStudentsQuery,
  useEvaluateStudentMutation,
  useCompleteStudentMutation,
  useGetCompletedStudentsQuery,
} = teacherApiSlice;

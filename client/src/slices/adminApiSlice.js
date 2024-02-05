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
      keepUnusedDataFor: 2,
    }),
    createAnnouncement: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/createannouncement`,
        method: "POST",
        body: data,
      }),
    }),
    deleteAnnouncement: builder.mutation({
      query: (announcementId) => ({
        url: `${ADMIN_URL}/deleteannouncement/${announcementId}`,
        method: "DELETE",
      }),
    }),
    updateAnnouncement: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/updateannouncement/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteTeacher: builder.mutation({
      query: (teacherId) => ({
        url: `${ADMIN_URL}/deleteteacher/${teacherId}`,
        method: "DELETE",
      }),
    }),
    deleteStudent: builder.mutation({
      query: (studentId) => ({
        url: `${ADMIN_URL}/deletestudent/${studentId}`,
        method: "DELETE",
      }),
    }),
    getSingleTeacher: builder.query({
      query: (teacherId) => ({
        url: `${ADMIN_URL}/teacher/${teacherId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getSingleStudent: builder.query({
      query: (studentId) => ({
        url: `${ADMIN_URL}/student/${studentId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    verifyTeacher: builder.mutation({
      query: (teacherId) => ({
        url: `${ADMIN_URL}/verify/${teacherId}`,
        method: "PATCH",
      }),
    }),
    updateTeacher: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/updateteacher/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    updateStudent: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/updatestudent/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetSummaryQuery,
  useGetAllTeachersQuery,
  useGetAllStudentsQuery,
  useGetAllPendingVerificationQuery,
  useCreateAnnouncementMutation,
  useDeleteAnnouncementMutation,
  useUpdateAnnouncementMutation,
  useDeleteTeacherMutation,
  useDeleteStudentMutation,
  useGetSingleTeacherQuery,
  useVerifyTeacherMutation,
  useUpdateTeacherMutation,
  useGetSingleStudentQuery,
  useUpdateStudentMutation,
} = adminApiSlice;

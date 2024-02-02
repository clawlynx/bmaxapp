import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    getUserInfo: builder.query({
      query: () => ({
        url: `${USERS_URL}/user`,
      }),
      keepUnusedDataFor: 5,
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/updateprofile`,
        method: "PATCH",
        body: data,
      }),
    }),
    getAnnouncements: builder.query({
      query: () => ({
        url: `${USERS_URL}/getannouncements`,
      }),

      keepUnusedDataFor: 5,
    }),
    getSingleAnnouncement: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/announcements/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useRegisterMutation,
  useGetUserInfoQuery,
  useLogoutMutation,
  useLoginMutation,
  useUpdateProfileMutation,
  useGetAnnouncementsQuery,
  useGetSingleAnnouncementQuery,
} = usersApiSlice;

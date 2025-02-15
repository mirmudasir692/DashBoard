import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../services/baseQuery"

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: `/accounts/login/`,
        method: "POST",
        body: { email, password },
      }),
      invalidatesTags: ['Auth'],
      extraOptions: { skipAuth: true },
    }),
    authStatus: builder.query({
      query: () => ({
        url: `/accounts/auth/status/`,
        method: "GET",
      }),
      providesTags: ['Auth'],
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: `/accounts/auth/refresh/`,
        method: "POST",
      }),
      invalidatesTags: ['Auth'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/accounts/logout`,
        method: "POST",
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useLoginMutation,
  useAuthStatusQuery,
  useRefreshTokenMutation,
  useLogoutMutation,
} = authApiSlice;

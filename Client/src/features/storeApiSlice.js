import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../services/baseQuery";

export const storeApiSlice = createApi({
  reducerPath: "storeApi",
  baseQuery,
  tagTypes: ["Stores"],
  endpoints: (builder) => ({
    getStores: builder.query({
      query: ({ page = 1 }) => ({
        url: "/stores/",
        method: "GET",
        params: { page }, // Alternative way to pass query params
      }),
      providesTags: ["Stores"],
    }),

    createStore: builder.mutation({
      query: (data) => ({
        url: `/stores/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Stores"],
    }),
    getStore: builder.query({
      query: (storeId) => `/stores/${storeId}/`,
      providesTags: ["Stores"],
    }),
    updateStore: builder.mutation({
      query: ({ storeId, data }) => ({
        url: `/stores/${storeId}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Stores"],
    }),
  }),
});

export const {
  useGetStoresQuery,
  useCreateStoreMutation,
  useGetStoreQuery,
  useUpdateStoreMutation,
} = storeApiSlice;

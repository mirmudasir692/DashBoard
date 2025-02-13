import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
 
export const authApiSlice = createApi({
    reducerPath: "authApiSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: "",
    }),
     refetchOnFocus: true,
    endpoints: (builder) => ({
        //Quert to fetch 
        getPosts: builder.query({query: () => ``}),
        // Mutation for CRUD operations
        createPosts:builder.mutation({
            query: (UserData) => ({
                url: ``,
                method: 'POST',
                body: UserData,
            }),
        }),
    }),
})
export const{ useGetUserDataQuery,useCreateUserMutation}=authApiSlice
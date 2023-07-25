import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, Posts } from "@/model/types";
export const userApi = createApi({
    reducerPath: "userApi",
    refetchOnFocus: true,
    tagTypes: ["Posts"],
    baseQuery: fetchBaseQuery({
      baseUrl: "https://jsonplaceholder.typicode.com/",
    }),
    endpoints: (builder) => ({
      getAllUsers: builder.query<User[], null>({
        query: () => "users",
      }),
      getUserById: builder.query<User, { id: string }>({
        query: ({ id }) => `users/${id}`,
      }),
      getAllPosts:builder.query({
        query: () =>"posts"
      }),
      getAllPhotos:builder.query({
        query:() =>"photos"
      })
    }),
  });
  
  export const { useGetAllPhotosQuery,useGetAllUsersQuery, useGetUserByIdQuery, useGetAllPostsQuery } = userApi;

  // https://jsonplaceholder.typicode.com/posts?_limit=10&_page=5
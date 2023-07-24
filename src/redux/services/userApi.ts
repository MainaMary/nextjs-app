import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "@/model/types";
export const userApi = createApi({
    reducerPath: "userApi",
    refetchOnFocus: true,
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
    }),
  });
  
  export const { useGetAllUsersQuery, useGetUserByIdQuery } = userApi;
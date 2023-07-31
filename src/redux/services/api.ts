import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { PostProps } from "@/model/types";
export const api = createApi({
    reducerPath: "posts",
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:5000/'}),
    tagTypes: ["Posts"],
    endpoints: (builder) => ({
        registerUser : builder.mutation({
            query: payload =>({
                url: '/signup',
                method: 'POST',
                body:payload,
                
            })
        }),
        loginUser : builder.mutation({
            query : payload =>({
                url:"/login",
                method:"POST",
                body:payload
            })
        }),
      getPosts: builder.query({
        query: () => "post",
        providesTags: ["Posts"],
      }),
      getSinglePost :builder.query({
         query:(id) => `post/${id}`,
         providesTags: ["Posts"],
      }),
      addPost :builder.mutation<void, PostProps>({
        query: payload =>({
            url: '/post',
            method:'POST',
            body: payload
        }),
        invalidatesTags: ["Posts"],
      }),
      updatePost : builder.mutation<void, PostProps>({
        query: ({id,...rest}) =>({
            url: `/post/${id}`,
            method:'PUT',
            body: rest

        }),
        invalidatesTags: ["Posts"],
      }),
      deletePost : builder.mutation<void, string |null>({
        query: (id) =>({
            url: `/post/${id}`,
            method:'DELETE',
           
        }),
        invalidatesTags: ["Posts"],
      })
    }),
  });
  export const {useLoginUserMutation, useRegisterUserMutation, useGetPostsQuery, useGetSinglePostQuery, useAddPostMutation, useDeletePostMutation, useUpdatePostMutation} = api
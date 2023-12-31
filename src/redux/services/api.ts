import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { PostProps } from "@/model/types";
import { TOKEN } from "../features/usersSlice";
const getToken = () =>{
  return localStorage.getItem(TOKEN)
}
export const api = createApi({
    reducerPath: "posts",
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:5000/',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
     
    },
  }),
    tagTypes: ["Posts","Comment"],
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
        query: (pageNumber) => `post?page=${pageNumber}`,
        providesTags: ["Posts"],
      }),
      getPostsByUser:builder.query({
        query:(id) =>`user-posts/?userId=${id}`,
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
      }),
      addComment :builder.mutation({
        query: payload =>({
            url:'/comment',
            method: 'POST',
            body:payload
        }),
        invalidatesTags:['Comment']
    }),
    getAllPostsComments : builder.query({
        query:(id) =>`/post-comments/?postId=${id}`,
        providesTags:["Comment"]

    }),
    getSingleComment: builder.query({
      query:(id) => `/comment/${id}`,
     providesTags:["Comment"]

    }),
    updateComment : builder.mutation<void, any>({
      query: ({id,...rest}) =>({
          url: `/post/${id}`,
          method:'PUT',
          body: rest

      }),
      invalidatesTags: ["Comment"],
    }),
    deleteComment: builder.mutation({
        query:(id) =>`/comment/${id}`,
        invalidatesTags:["Comment"]

    })
    }),
  });
  export const {useLoginUserMutation,  useGetPostsByUserQuery,useRegisterUserMutation, useGetPostsQuery, useGetSinglePostQuery, useAddPostMutation, useDeletePostMutation, useUpdatePostMutation,useAddCommentMutation, useGetAllPostsCommentsQuery, useDeleteCommentMutation,useGetSingleCommentQuery, useUpdateCommentMutation} = api
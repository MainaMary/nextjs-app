"use client";
import { useEffect, useState } from "react";
import {CgProfile} from "react-icons/cg"
import { Comment } from "@/model/types";
import {
  useGetSinglePostQuery,
  useGetAllPostsCommentsQuery,
} from "@/redux/services/api";
import useLocalStorage from "@/customhooks/useLocalStorage";
export default function PostId({ params }: { params: { postId: string } }) {
  const { data: singlePostData, isLoading: isPostLoading } =
    useGetSinglePostQuery(params.postId);
  const { data: comments, isLoading: isLoadingComments } =
    useGetAllPostsCommentsQuery(params.postId);
  const {currentUser} = useLocalStorage()
  return (
    <div>
      {params.postId}
      {isPostLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="border-gray-400 border-b-[2px]">
          {singlePostData.data.title}
          <p>{singlePostData.data.body}</p>
        </div>
      )}
      <h3>Comments</h3>
      <div>{isLoadingComments ? <p>Loading...</p> : <div>
        {comments.data.map((comment:Comment) =>
      
        <div key={comment._id}>
            <div className="flex gap-8 items-center my-2">
                <CgProfile/>
                <div className="">
                    <p>{comment.name}</p>
                    <p>{comment.createdAt}</p>
                </div>
              
            </div>
            <p>{comment.body}</p>
            {  currentUser.email === comment.email && <div>
              <p>edit</p>
                            <p>delete</p>
              </div>}
               
        </div>)}
        </div>}</div>
    </div>
  );
}

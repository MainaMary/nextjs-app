"use client";

import { useState } from 'react';
import {GrFormPrevious,GrFormNext} from "react-icons/gr"



import { Posts, SinglePostProps } from '@/model/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useGetPostsQuery} from '@/redux/services/api';
import FeedCard from '@/components/FeedCard';
import PostPagination from '@/components/PostPagination';
import { increment, decrement } from '@/redux/features/paginationSlice';

export default function Home() {
  const dispatch = useAppDispatch()
  const {pageNumber} = useAppSelector(state =>state.counter)
  

  const handlePageIncrease = () =>{
   dispatch(increment())
  
  }
  const handlePageDecrease = () =>{
    dispatch(decrement())
  }
  console.log(pageNumber)
  const { data, isLoading, isFetching } = useGetPostsQuery(pageNumber);
  return (
  <div> 
    <h2 className='my-8 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>Posts</h2>
    <div className='gap-4 grid sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8'>
    {isLoading || isFetching ? (
       data?.data?.map((post: Posts) => (
        <div key={post.id} className='flex flex-col overflow-hidden rounded-lg border bg-white w-[600px] h-[600px]'></div>
      ))
      
    ) : data?.data?.length > 0 ? (
      data?.data?.map((post: SinglePostProps, index: number) => (
        <FeedCard key={index} post={post}  showComment={true}/>
      ))
    ) : (
      <p>Loading...</p>
    )}
    </div>
    <div className="flex m-auto">
      {data && <div className="flex m-auto gap-5">
        <button onClick={handlePageDecrease}><GrFormPrevious/></button>
        <p>{pageNumber}</p>
        <button onClick={handlePageIncrease}><GrFormNext/></button>
        </div>}
    </div>
  </div>
  )
}

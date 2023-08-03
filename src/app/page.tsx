"use client";


import { Posts, SinglePostProps } from '@/model/types';
import { useGetAllPhotosQuery} from '@/redux/services/postApi'
import { useGetPostsQuery} from '@/redux/services/api';
import FeedCard from '@/components/FeedCard';

export default function Home() {
  const { data, isLoading, isFetching } = useGetPostsQuery("");
  return (
  <div> 
    <h2 className='my-8 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>Posts</h2>
    <div className='gap-4 grid sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8'>
    {isLoading || isFetching ? (
       data?.map((post: Posts) => (
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
  </div>
  )
}

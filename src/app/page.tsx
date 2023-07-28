"use client";


import { Posts } from '@/model/types';
import { useGetAllPhotosQuery, useGetAllPostsQuery } from '@/redux/services/postApi'
import PostCard from '@/components/postcard';

export default function Home() {
  const { isLoading, isFetching, data, error } =useGetAllPostsQuery('posts');
  const {data:allphotos} = useGetAllPhotosQuery('photos')
  console.log(allphotos?.slice(0,10))
  return (
  <div> 
    <h2 className='my-8 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>Posts</h2>
    <div className='gap-4 grid sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8'>
    {isLoading || isFetching ? (
       data?.map((post: Posts) => (
        <div key={post.id} className='flex flex-col overflow-hidden rounded-lg border bg-white w-[600px] h-[600px]'></div>
      ))
      
    ) : allphotos?.length && data?.length ? (
      data?.slice(0,10).map((post: Posts, index: number) => (
        <PostCard photos={allphotos[index]} key={post.id} post={post}  />
      ))
    ) : (
      <p>Loading...</p>
    )}
    </div>
  </div>
  )
}

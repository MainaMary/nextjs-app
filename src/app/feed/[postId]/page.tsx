"use client"
import { useGetAllPostsCommentsQuery, useGetPostsQuery } from "@/redux/services/api"
export default function PostId({params}:{params:{postId:string}}){
    const {data, isLoading} = useGetAllPostsCommentsQuery(params.postId)
    const{data:posts} = useGetPostsQuery('')
    const post = posts?.data?.data?.find((post:any) =>post._id === params.postId)
    console.log(post)
    return <div>
     {params.postId}
    </div>
}
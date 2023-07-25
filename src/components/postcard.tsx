import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Posts, Photos } from "@/model/types"
interface Props{
    post:Posts,
    photos:Photos
}
export default function PostCard({post,photos}: Props){
    return <div className="flex flex-col overflow-hidden rounded-lg border bg-white">
        <Link className=" group block h-48 overflow-hidden bg-gray-100 md:h-64 relative" href={`/post/${post.id}`}>
            <Image width={500} height={500} alt={post.title} src={photos.url} className="absolute inset-0 h-full w-full object-cover object-center  transition duration-200 group-hover:scale-110"/>
        </Link>
        <div className="flex flex-1 flex-col p-4 sm:p-6">
            <Link href={`/post/${post.id}`} className="transition duration-100 hover:text-blue-900 active:text-blue-900">
            <h2 className="mb-2 text-large font-semibold text-gray-800 line-clamp-1">{post.title}</h2>
            </Link>
            <p className="text-gray-500 line-clamp-4">{post.body}</p>
           

        </div>
    </div>
}
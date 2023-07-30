import { useGetAllPostsQuery } from "@/redux/services/postApi"
export default function Feed(){
    const{data} = useGetAllPostsQuery('')
    return (
        <div></div>
    )
}
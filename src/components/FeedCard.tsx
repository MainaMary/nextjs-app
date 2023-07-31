import { useState } from "react";
import { FaCommentAlt } from "react-icons/fa";
import { SinglePostProps } from "@/model/types";
import useModal from "@/customhooks/useModal";
import { useAppDispatch } from "@/redux/hooks";
import { setPostId, setEdit } from "@/redux/features/postSlice";
import ConfirmModal from "./ConfirmModal";
import AddPost from "./AddPost";
import { useAppSelector } from "@/redux/hooks";
interface Props {
  post: SinglePostProps;
}
export default function FeedCard({ post }: Props) {
const [showModal, setShowModal] = useState<boolean>(false)
  const dispatch = useAppDispatch();
  const {isEdit} = useAppSelector(state=> state.post)
  const handleModal =() =>{
    setShowModal(prev =>!prev)
  }
  const handleUpdate = (postId: string) => {
    dispatch(setPostId(postId));
   handleModal()
    setEdit(false)
  };
  const handleDelete = (postId: string) => {
    handleModal()
    dispatch(setPostId(postId));
    setEdit(true)
  };
  console.log(showModal)
  return (
    <>
      <div className="flex flex-col mt-12 px-3 py-4 overflow-hidden rounded-lg border bg-white">
        <div className="flex items-center h-auto">
          <div className="text-sm">
            <p> {post.createdAt}</p>
          </div>
        </div>
        <p className="text-dark-blue h-[40px] line-clamp-2 mt-4 ">
          {post.title}
        </p>
        <p className="line-clamp-4 h-[60px]">{`${post.body}`}</p>
        <p className="cursor-pointer font-semibold text-dark-blue mt-4">
          View post
        </p>
        <div className="flex justify-between w-full mb-2 h-auto items-center">
          <p>5 comments</p>
          <div className="flex h-auto items-center cursor-pointer">
            <FaCommentAlt className="text-gray-500" />
            <p className="ml-4">comment</p>
          </div>
        </div>
        <div className="flex h-auto items-center border-[2px] my-3 border-b border-gray-500"></div>
        <div className="flex justify-between mt-2">
          <button
            onClick={() => handleUpdate(post._id)}
            className=" rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 border-solid border-2 border-dark-blue bg-white text-dark-blue flex h-auto items-center"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(post._id)}
            className="rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 border-solid border-2 border-red-600 text-red-600 flex h-auto items-center cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
      {showModal && <ConfirmModal />}
      {showModal   && <AddPost openModal={showModal} handleModal={handleModal}/>}
    </>
  );
}

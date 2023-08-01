import { useState } from "react";
import { FaCommentAlt } from "react-icons/fa";
import { SinglePostProps } from "@/model/types";
import Input from "./Input";
import Button from "./Button";
import { useAppDispatch } from "@/redux/hooks";
import { setPostId, setEdit } from "@/redux/features/postSlice";
import ConfirmModal from "./ConfirmModal";
import AddPost from "./AddPost";
import { useAppSelector } from "@/redux/hooks";
import Modal from "./Modal";
import { useAddCommentMutation, useGetAllPostsCommentsQuery } from "@/redux/services/api";
interface Props {
  post: SinglePostProps;
}
export default function FeedCard({ post }: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isComment, setIsComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [id, setId] = useState<string>("");
  const dispatch = useAppDispatch();
  const [addComment,{data, isLoading:isLoadingComment}] = useAddCommentMutation()
  const {data:allComments} =useGetAllPostsCommentsQuery(id)
  const { isEdit } = useAppSelector((state) => state.post);
  const handleModal = () => {
    setShowModal((prev) => !prev);
  };
  const handleUpdate = (postId: string) => {
    dispatch(setPostId(postId));
    handleModal();
    dispatch(setEdit(true));
  };

  const handleDelete = (postId: string) => {
    handleModal();
    dispatch(setPostId(postId));
    dispatch(setEdit(false));
  };
  const handleCommentForm = () => {
    setIsComment((prev) => !prev);
  };
  const handleSubmit = async (e: React.SyntheticEvent, id: string) => {
    e.preventDefault();
    setId(id);
    const payload = {
      body: comment,
      name:'testuser',
      postId:id,
      email:"test@gmail.com"
    }
    setComment('')
    const response = await addComment(payload)
    if(data?.status){
      handleCommentForm()
    }
    console.log({response})
  };
  console.log({postdata: data})
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
         {
          allComments?.length > 0 &&  <p>{`${allComments?.data?.length} comments`}</p>
         }
          <div
            className="flex h-auto items-center cursor-pointer"
            onClick={() => {
              handleCommentForm(), setId(post._id);
            }}
          >
            <FaCommentAlt className="text-gray-500" />
            <p className="ml-4">comment</p>
          </div>
        </div>
        {id === post._id &&  isComment && (
          <form
            onSubmit={(e: any) => handleSubmit(e, post._id)}
            className="flex"
          >
            <div className="my-4 block md:flex w-full justify-between">
              {/* <CustomInput
                        placeholder="e.g Good article"
                        name="labelId"
                        onChange={(e: any) => setDataComment((dataComment:any)=> ({...dataComment, [label._id]:e.target.value}))}
                        type="text"
                        value={dataComment[label._id]}
                      /> */}
              <Input
                placeholder="e.g Good article"
                name="comment"
                onChange={(e: any) => setComment(e.target.value)}
                type="text"
                value={comment}
              />
              <Button className="md:ml-3">Add</Button>
            </div>
          </form>
        )}
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
      {showModal && !isEdit && (
        <ConfirmModal openModal={showModal} handleModal={handleModal} />
      )}
      {showModal && isEdit && (
        <Modal>
          <AddPost openModal={showModal} handleModal={handleModal} />
        </Modal>
      )}
    </>
  );
}

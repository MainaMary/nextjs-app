import { useState, useEffect } from "react";
import { FaCommentAlt } from "react-icons/fa";
import { SinglePostProps } from "@/model/types";
import Input from "./Input";
import Button from "./Button";
import { useAppDispatch } from "@/redux/hooks";
import { setPostId, setEdit } from "@/redux/features/postSlice";
import ConfirmModal from "./ConfirmModal";
import AddPost from "./AddPost";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import {
  useAddCommentMutation,
  useGetAllPostsCommentsQuery,
  useGetPostsQuery,
} from "@/redux/services/api";
import useLocalStorage from "@/customhooks/useLocalStorage";
import CommentForm from "./CommentForm";
interface Props {
  post: SinglePostProps;
  showComment: boolean;
}
export default function FeedCard({ post, showComment }: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isComment, setIsComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [id, setId] = useState<string>("");
  const { currentUser } = useLocalStorage();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [addComment, { data, isLoading: isLoadingComment }] =
    useAddCommentMutation();
  const { data: allComments } = useGetAllPostsCommentsQuery(
    showComment && post._id
  );
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
      name: "testuser",
      postId: id,
      email: currentUser.email,
    };
    setComment("");
    const response = await addComment(payload);
    if (data?.status) {
      handleCommentForm();
    }
  };
  console.log(allComments?.data?.length);
  const handleNavigate = (id: string) => {
    router.push(`/feed/${id}`);
  };
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
        <p
          className="cursor-pointer font-semibold text-dark-blue mt-4"
          onClick={() => handleNavigate(post._id)}
        >
          View post
        </p>
        {showComment && (
          <div className="flex justify-between w-full mb-2 h-auto items-center">
            {allComments?.data?.length > 0 && (
              <p>{`${allComments?.data?.length} comments`}</p>
            )}
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
        )}
        {id === post._id && isComment && showComment && (
          <CommentForm handleCommentForm={handleCommentForm} id={id} />
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
          <AddPost
            openModal={showModal}
            handleModal={handleModal}
            isUser={showComment}
          />
        </Modal>
      )}
    </>
  );
}

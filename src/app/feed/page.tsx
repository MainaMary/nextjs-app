"use client";
import { useState } from "react";
import { useGetPostsQuery } from "@/redux/services/api";
import AddPost from "@/components/AddPost";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import FeedCard from "@/components/FeedCard";
import { SinglePostProps } from "@/model/types";
import { useAppDispatch } from "@/redux/hooks";
import { setEdit, setPostId } from "@/redux/features/postSlice";
export default function Feed() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { data, isLoading: isLoadingPosts } = useGetPostsQuery("");
  console.log(data);

  const dispatch = useAppDispatch()
  const handleModal = () => {
    setOpenModal((prev) => !prev);
    dispatch(setEdit(false))
    dispatch(setPostId(''))
  };
  console.log(data?.data?.length);
  const filteredPosts = data?.data?.map((post: SinglePostProps) => post._id);
  console.log(filteredPosts);
  return (
    <div>
      <div className="flex justify-between ">
        <h2 className="my-8  text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
          Feed
        </h2>
        <button onClick={handleModal}>Add post</button>
      </div>
      {isLoadingPosts ? (
        <p>Loading...</p>
      ) : (
        <div>
          {data?.data?.length > 0 ? (
            <div className="gap-4 grid sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
              {data?.data?.map((post: SinglePostProps, index:number) => (
                <FeedCard key={index} post={post}  />
              ))}
            </div>
          ) : (
            "Add a post"
          )}
          <p>Add pagination here...</p>
        </div>
      )}
      {openModal && (
        <Modal>
          <AddPost openModal={openModal} handleModal={handleModal} />
        </Modal>
      )}
    </div>
  );
}

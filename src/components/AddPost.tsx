import React, { useState, useEffect } from "react";

import { PostProps,MProps, SinglePostProps } from "@/model/types";
import { useAddPostMutation, useUpdatePostMutation, useGetPostsQuery } from "@/redux/services/api";
import Title from "./Title";
import Label from "./Label";
import Input from "./Input";
import Button from "./Button";
import { toast } from "react-toastify";
import { useAppSelector } from "@/redux/hooks";
import useModal from "@/customhooks/useModal";
import { useGetPostsByUserQuery, useGetSinglePostQuery } from "@/redux/services/api";

const AddPost = (props:MProps) => {
  const{handleModal,  isUser} = props
  const [formValues, setFormValues] = useState<PostProps>({
    title: "",
    body: "",
    id: "",
  });
  const [error, setError] = useState<string>("");
  const [addPost] = useAddPostMutation();
  const [updatePost] = useUpdatePostMutation()
  const {data} = useGetPostsQuery('')
  const {setShowModal} = useModal()
  
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setError('')
    setFormValues({
      ...formValues,
      [name]: value,
    });
     };
  const {title,body} = formValues
  const {isEdit, postId} = useAppSelector(state=> state.post)
  const {user} = useAppSelector(state=> state.auth)
  const {data:allUserPosts} = useGetPostsByUserQuery(user._id)
  const {data:editedPost, isSuccess} = useGetSinglePostQuery(postId)
  //const editedPost =  isUser ? data?.data?.find((post:SinglePostProps) => post._id === postId) : allUserPosts?.data?.find((post:SinglePostProps) => post._id === postId)
   

  useEffect(() =>{
    if(isSuccess){
      const newObj = {
        title: editedPost.data.title,
        body: editedPost.data.body,
        id: editedPost.data._id,
      };
      setFormValues({...newObj})
    }
   
  },[editedPost])
 
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if(!title || !body){
        setError('Please submit all details')
    }
    const payload = {
        body,
        title,
        userId: user._id,
      };
     
      if (formValues.id) {
        const updatedpayload = {
          body,
          title,
          userId: editedPost.data?.userId,
          id: editedPost?.data?._id,
        };
        const response:any = await updatePost(updatedpayload);
       console.log(response.data.status)
        if (response.data.status) {
          toast.info('Post successfully edited')
          handleModal()
         }
      } else {
        console.log(formValues.id)
  
        const response: any = await addPost(payload);
        console.log(response, "post items");
        if (response.data.status) {
          toast.info('Post successfully created')
          handleModal()
         }
      }  
      

     
      
  };
  const modalHandler = () =>{
   setShowModal(false)
   handleModal()
  }
 
  
  return (
    <div className="w-full md:w-[50%] shadow-lg rounded-2xl flex m-auto bg-white px-8 py-3 items-center justify-center h-auto">
      <form className="w-full" onSubmit={handleSubmit}>
        <Title>{isEdit ? 'Edit post' :'Add post'}</Title>
        <p onClick={modalHandler}>Cancel</p>
        <div className="my-4">
          <Label>Title</Label>
          <Input
            placeholder="John Doe"
            name="title"
            onChange={handleInput}
            type="text"
            value={title}
          />
        </div>
        <div className="my-4">
          <Label>Post</Label>
          <Input
            placeholder="autem assumenda"
            name="body"
            onChange={handleInput}
            type="text"
            value={body}
          />
        </div>

        <div className="my-4 flex justify-between">
          <Button type="submit">
            {isEdit ? "Edit" : "Add"}
           
          </Button>
          <Button onClick={modalHandler}>Cancel</Button>
         
        </div>
       
      </form>
     
    </div>
  );
};

export default AddPost;

import React,{useEffect, useState} from "react";
import Input from "./Input";
import Button from "./Button";
import useLocalStorage from "@/customhooks/useLocalStorage";
import { useAddCommentMutation,useGetSingleCommentQuery, useUpdateCommentMutation} from "@/redux/services/api";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";
interface Props {
  id: string;
 
  handleCommentForm: () => void;
}
const CommentForm = ({  id, handleCommentForm }: Props) => {
  const [comment, setComment] = useState('')
  const { currentUser } = useLocalStorage();
  const [addComment, { data, isLoading: isLoadingComment }] =
    useAddCommentMutation();
const [updateComment] = useUpdateCommentMutation()
const {postId} = useAppSelector(state =>state.post)
const {data:editedComment, isSuccess} = useGetSingleCommentQuery(postId)

console.log(editedComment)
useEffect(() =>{
    if(isSuccess){
      const newObj = {
        body: editedComment.data.body,
        name: "testuser",
        postId,
        email: editedComment.data.email,
      };
      setComment(newObj.body)
    }
   
  },[editedComment, setComment])
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if(postId){
      const updatedPayload = {
        body:comment,
        name: "testuser",
        postId:editedComment.data._id,
        email: editedComment.data.email,
        
      }
      const response:any = await updateComment(updatedPayload);
      console.log(response.data.status)
       if (response.data.status) {
         toast.info('Comment successfully edited')
        
        }
    
    }else{
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
    }
   
  };
  return (
    <form onSubmit={handleSubmit} className="flex">
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
  );
};

export default CommentForm;

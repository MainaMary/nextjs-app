import React,{useEffect} from "react";
import Input from "./Input";
import Button from "./Button";
import useLocalStorage from "@/customhooks/useLocalStorage";
import { useAddCommentMutation,useGetSingleCommentQuery} from "@/redux/services/api";
import { useAppSelector } from "@/redux/hooks";

interface Props {
  id: string;
  comment: string;
  setComment: any;
  handleCommentForm: () => void;
}
const CommentForm = ({ comment, id, setComment, handleCommentForm }: Props) => {
  const { currentUser } = useLocalStorage();
  const [addComment, { data, isLoading: isLoadingComment }] =
    useAddCommentMutation();
const {postId} = useAppSelector(state =>state.post)
const {data:editedComment, isSuccess} = useGetSingleCommentQuery(postId)

console.log(editedComment)
// useEffect(() =>{
//     if(isSuccess){
//       const newObj = {
//         title: editedComment.data.title,
//         body: editedPost.data.body,
//         id: editedPost.data._id,
//       };
//       setFormValues({...newObj})
//     }
   
//   },[editedComment])
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if(postId){

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

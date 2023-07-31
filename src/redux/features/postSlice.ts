import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface PostType{
    postId: string,
    isEdit: boolean
}
const initialState = {
    postId:'',
    isEdit: false
}
export const PostSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
     setPostId: (state:PostType, action:PayloadAction<string>) =>{
        state.postId = action.payload
     },
     setEdit:(state:PostType, action:PayloadAction<boolean>)=>{
      state.isEdit = action.payload
     }
    },
  });
  export const { setPostId,setEdit } = PostSlice.actions;
  const postReducer = PostSlice.reducer;
  export { postReducer };
  